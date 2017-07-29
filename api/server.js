require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var azure = require('azure-storage');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

const TABLE_NAME = 'goatTable';
const TABLE_PKEY = 'goats';

// Only used for init the table
var goat_data = [
   { id: 10, name: 'Nigel', photo: 'goat1.jpg', likes: 0, desc: "A good all round goat" },
   { id: 11, name: 'Mr Frisky', photo: 'goat2.jpg', likes: 0, desc: "Pretty jumpy fella" },
   { id: 12, name: 'Lumpy Dave', photo: 'goat3.jpg', likes: 0, desc: "Dave is the name of this goat" },
   { id: 13, name: 'Old Stumpy', photo: 'goat4.jpg', likes: 0, desc: "Older guy, sleeps a lot" },
   { id: 14, name: 'Bogart', photo: 'goat5.jpg', likes: 5, desc: "Smells kinda bad, 6/10" },
   { id: 15, name: 'Dodgy Ian', photo: 'goat6.jpg', likes: 8, desc: "Likely upto no good" },
   { id: 16, name: 'Sad Ken', photo: 'goat7.jpg', likes: 11, desc: "Cheer up Ken!" },
   { id: 17, name: 'Just Bob', photo: 'goat8.jpg', likes: 1, desc: "His name is Bob" },
   { id: 18, name: 'Psycho Goat', photo: 'goat9.jpg', likes: 9, desc: "Watch out for this guy" },
   { id: 19, name: 'Goatkins', photo: 'goat10.jpg', likes: 0, desc: "Cheeky little fella" },
   { id: 20, name: 'Bert The Goat', photo: 'goat11.jpg', likes: 2, desc: "Learning to play piano" }
];

// We need these set or it's impossible to continue
if(!process.env.APPSETTING_STORAGE_ACCOUNT || !process.env.APPSETTING_STORAGE_KEY) {
    console.log("### !ERROR! Missing env variables `APPSETTING_STORAGE_ACCOUNT` or `APPSETTING_STORAGE_KEY`. Exiting!");
    process.exit(1)
}

// Note APPSETTING_STORAGE_ACCOUNT and APPSETTING_STORAGE_KEY are required to be set
var tablesvc = azure.createTableService(process.env.APPSETTING_STORAGE_ACCOUNT, process.env.APPSETTING_STORAGE_KEY);

// GET - List all goats
app.get('/goats', function (req, res) {
   var query = new azure.TableQuery().where('PartitionKey eq ?', TABLE_PKEY);

   tablesvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
      if (!error) {
         result.entries.map(goat => flattenObject(goat));
         res.type('application/json');
         res.send({ data: result.entries });
      }
   });
});

// GET - Single goat by id
app.get('/goats/:id', function (req, res) {
   tablesvc.retrieveEntity(TABLE_NAME, TABLE_PKEY, req.params.id, function (error, result, response) {
      if (!error) {
         res.type('application/json');
         res.send({ data: flattenObject(result) });
      }
   });
});

// PUT - Update single goat by id
app.put('/goats/:id', function (req, res) {
   var goat = req.body;
   goat.PartitionKey = TABLE_PKEY;
   tablesvc.replaceEntity(TABLE_NAME, goat, function (error, result, response) {
      if (!error) {
         res.send();
      }
   });
});

// POST - Create new goat 
app.post('/goats', function (req, res) {
   var goat = req.body;
   goat.PartitionKey = TABLE_PKEY;

   var maxrowkey = 0;
   var query = new azure.TableQuery().where('PartitionKey eq ?', TABLE_PKEY);
   tablesvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
      if (!error) {
         result.entries.sort((g1, g2) => g2.RowKey._ - g1.RowKey._);
         maxrowkey = result.entries[0].RowKey._;
         goat.RowKey = (parseInt(maxrowkey) + 1).toString();
         tablesvc.insertEntity(TABLE_NAME, goat, function (error, result, response) {
            if (!error) {
               res.status(200).send( {} );
            } else {
               res.status(500).send(error.message);
            }
         });
      } else {
         res.status(500).send(error.message)
      }
   });
});

// DELETE - Update single goat by id
app.delete('/goats/:id', function (req, res) {
   var goat = { PartitionKey: { '_': TABLE_PKEY }, RowKey: { '_': req.params.id } };
   tablesvc.deleteEntity(TABLE_NAME, goat, function (error, result, response) {
      if (!error) {
         res.send();
      }
   });
});

// GET - Init the database, wipe and reset data
app.get('/initdb', function (req, res) {
   tablesvc.deleteTableIfExists(TABLE_NAME, function (error, result, response) {
      if (!error) {
         console.log(" ### DB Init started. Table deleted, going to re-create it in 10secs... ");
         setTimeout(createTable, 10000);
      } else {
         console.error(error)
      }
   });
   res.status(200).send("Database init started... It should take about 40 seconds")
});

// GET - Search. Honestly this is junk, but Table Storage doesn't support wildcard/text querying  
app.get('/goats/search/:q', function (req, res) {
   var query = new azure.TableQuery().where('PartitionKey eq ?', TABLE_PKEY);
   tablesvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
      if (!error) {
         var srch_results = [];
         // Lets do a brute force full index string match search because we're idiots
         for(let r of result.entries) {
            if(r.name._.toString().toLowerCase().includes(req.params.q.toLowerCase())) {
               srch_results.push(flattenObject(r));
            }
         }
         res.type('application/json');
         res.send({ data: srch_results });
      }
   });
});

// Catch all
app.get('*',function (req, res) {
   res.send("Unknown API route, bummer!")
});

// Start the server
var port = process.env.PORT || 8080;
app.listen(port, function () {
   console.log(`### Goat API listening on port ${port}`)
});

// Object flattener - moves sub-properties referenced by underscore
function flattenObject(obj) {
   for (prop in obj) {
      obj[prop] = obj[prop]._;
   }
   return obj;
}

// Called when running initdb
function createTable() {
   tablesvc.createTableIfNotExists(TABLE_NAME, function (error, result, response) {
      if (!error) {
         console.log(" ### Table created! ");
         var batch = new azure.TableBatch();
         for (var g = 0; g < goat_data.length; g++) {
            var goat = {
               PartitionKey: { '_': TABLE_PKEY },
               RowKey: { '_': goat_data[g].id.toString() },
               name: { '_': goat_data[g].name },
               photo: { '_': goat_data[g].photo },
               likes: { '_': goat_data[g].likes },
               desc: { '_': goat_data[g].desc }
            };
            batch.insertOrReplaceEntity(goat, { echoContent: true });
         }
         tablesvc.executeBatch(TABLE_NAME, batch, function (error, result, response) {
            if (!error) {
               console.log(" ### Added fresh batch of goats to table, DB init complete!")
            }
         });
      } else {
         if (error.statusCode == 409) {
            console.log(" ### Table still being deleted, retry in 10sec... ");
            setTimeout(createTable, 10000);
         }
      }
   });
}