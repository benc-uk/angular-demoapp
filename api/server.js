require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var azure = require('azure-storage');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

const TABLE_NAME = 'thingTable';
const TABLE_PKEY = 'things';

// Only used for init the table
var thing_data = [
      { id: 0,  name: 'ZX Spectrum', photo: 'zx-spectrum.jpg', likes: 11, desc: 'Blah' },
      { id: 11, name: 'Commodore 64', photo: 'c64.jpg', likes: 9, desc: 'Blah' },
      { id: 12, name: 'Amstrad CPC 464', photo: 'amstrad-cpc-464.jpg', likes: 6, desc: 'Blah' },
      { id: 13, name: 'ZX81', photo: 'zx81.jpg', likes: 8, desc: 'Blah' },
      { id: 14, name: 'Amiga A500', photo: 'amiga-a500.jpg', likes: 15, desc: 'Blah' },
      { id: 15, name: 'Atari 520ST', photo: 'atari-520st.jpg', likes: 2, desc: 'Blah' },
      { id: 16, name: 'BBC Micro', photo: 'bbc-micro.jpg', likes: 5, desc: 'Blah' },
      { id: 17, name: 'Commodore VIC-20', photo: 'vic-20.jpg', likes: 3, desc: 'Blah' },
      { id: 18, name: 'Dragon 32', photo: 'dragon-32.jpg', likes: 4, desc: 'Blah' },
      { id: 19, name: 'Acorn Electron', photo: 'acorn-electron.jpg', likes: 1, desc: 'Blah' },
      { id: 20, name: 'SAM Coupé', photo: 'sam-coupe.jpg', likes: 2, desc: 'Blah' }
];

// We need these set or it's impossible to continue
if(!process.env.APPSETTING_STORAGE_ACCOUNT || !process.env.APPSETTING_STORAGE_KEY) {
    console.log("### !ERROR! Missing env variables `APPSETTING_STORAGE_ACCOUNT` or `APPSETTING_STORAGE_KEY`. Exiting!");
    process.exit(1)
}

// Note APPSETTING_STORAGE_ACCOUNT and APPSETTING_STORAGE_KEY are required to be set
var tablesvc = azure.createTableService(process.env.APPSETTING_STORAGE_ACCOUNT, process.env.APPSETTING_STORAGE_KEY);

// GET - List all things
app.get('/things', function (req, res) {
   var query = new azure.TableQuery().where('PartitionKey eq ?', TABLE_PKEY);

   tablesvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
      if (!error) {
         result.entries.map(thing => flattenObject(thing));
         res.type('application/json');
         res.send({ data: result.entries });
      }
   });
});

// GET - Single thing by id
app.get('/things/:id', function (req, res) {
   tablesvc.retrieveEntity(TABLE_NAME, TABLE_PKEY, req.params.id, function (error, result, response) {
      if (!error) {
         res.type('application/json');
         res.send({ data: flattenObject(result) });
      }
   });
});

// PUT - Update single thing by id
app.put('/things/:id', function (req, res) {
   var thing = req.body;
   thing.PartitionKey = TABLE_PKEY;
   tablesvc.replaceEntity(TABLE_NAME, thing, function (error, result, response) {
      if (!error) {
         res.type('application/json');
         res.send( {message: `Thing ${thing.RowKey} was deleted OK`} );
      }
   });
});

// POST - Create new thing 
app.post('/things', function (req, res) {
   var thing = req.body;
   thing.PartitionKey = TABLE_PKEY;

   var maxrowkey = 0;
   var query = new azure.TableQuery().where('PartitionKey eq ?', TABLE_PKEY);
   tablesvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
      if (!error) {
         result.entries.sort((g1, g2) => g2.RowKey._ - g1.RowKey._);
         maxrowkey = result.entries[0].RowKey._;
         thing.RowKey = (parseInt(maxrowkey) + 1).toString();
         res.type('application/json');
         tablesvc.insertEntity(TABLE_NAME, thing, function (error, result, response) {
            if (!error) {
               res.status(200).send({ message: `Thing added to table OK, with RowKey ${thing.RowKey}`} );
            } else {
               res.status(500).send({ message: `Error creating thing: '${error.message}'` });
            }
         });
      } else {
         res.status(500).send(error.message)
      }
   });
});

// DELETE - Remove single thing by id
app.delete('/things/:id', function (req, res) {
    var thing = { PartitionKey: { '_': TABLE_PKEY }, RowKey: { '_': req.params.id } };
    tablesvc.deleteEntity(TABLE_NAME, thing, function (error, result, response) {
        res.type('application/json');
        if (!error) {
            res.status(200).send({ message: `Thing ${thing.RowKey._} was deleted OK` });
        } else {
            res.status(500).send({ message: `Error deleting thing: '${error.message}'` });
        }
    });
});

// GET - Init the database, wipe and reset data
app.get('/initdb', function (req, res) {
   tablesvc.deleteTableIfExists(TABLE_NAME, function (error, result, response) {
      if (!error) {
         console.log("### DB Init started. Table deleted, going to re-create it in 10secs... ");
         setTimeout(createTable, 10000);
      } else {
         console.error(error)
      }
   });
   res.type('application/json');
   res.status(200).send({ message:"Database init started. It should take ~40 seconds" })
});

// GET - Status check 
app.get('/status', function (req, res) {
   tablesvc.listTablesSegmented(null, function (error, result, response) {
      var message = {}

      message.APPSETTING_STORAGE_ACCOUNT = process.env.APPSETTING_STORAGE_ACCOUNT;
      message.APPSETTING_STORAGE_KEY_EXISTS = (process.env.APPSETTING_STORAGE_KEY.length > 0);
      message.TABLE_SVC_EXISTS = (tablesvc != null);

      if (!error) {
         message.TABLE_LIST = result.entries;
      } else {
         message.ERROR = "Error with storage account, could not list tables";
      }
      
      res.status(200).send(message);
   })

});

// GET - Search. Honestly this is junk, but Table Storage doesn't support wildcard/text querying  
app.get('/things/search/:q', function (req, res) {
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
   res.send("Unknown API route!")
});

// Start the server
var port = process.env.PORT || 8080;
app.listen(port, function () {
   console.log(`### API listening on port ${port}`)
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
         console.log("### Table (re)created! ");
         var batch = new azure.TableBatch();
         for (var g = 0; g < thing_data.length; g++) {
            var thing = {
               PartitionKey: { '_': TABLE_PKEY },
               RowKey: { '_': thing_data[g].id.toString() },
               name: { '_': thing_data[g].name },
               photo: { '_': thing_data[g].photo },
               likes: { '_': thing_data[g].likes },
               desc: { '_': thing_data[g].desc }
            };
            batch.insertOrReplaceEntity(thing, { echoContent: true });
         }
         tablesvc.executeBatch(TABLE_NAME, batch, function (error, result, response) {
            if (!error) {
               console.log("### Added fresh batch of things to table, DB init complete!")
            }
         });
      } else {
         if (error.statusCode == 409) {
            console.log("### Table still being deleted, will retry in 10sec... ");
            setTimeout(createTable, 10000);
         }
      }
   });
}