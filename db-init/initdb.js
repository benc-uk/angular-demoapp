var args = process.argv.slice(2);
var azure = require('azure-storage');

const TABLE_NAME = 'goatTable';

// Pass two args to this script, first is the name of the storage account, the second is the access key
var tableService = azure.createTableService(args[0], args[1]);

var goat_data = [
    { id: 0,  name: 'Nigel', photo: 'goat1.jpg', likes: 0, desc: "A good all round goat" },
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

tableService.deleteTableIfExists(TABLE_NAME, function (error, result, response) {
    if (!error) {
        console.log(" ### Table deleted, going to re-create it in 10secs... "); setTimeout(createTable, 10000);
    } else {
        console.error(error)
    }
});

createTable = function () {
    tableService.createTableIfNotExists(TABLE_NAME, function (error, result, response) {
        if (!error) {
            console.log(" ### Table created! ");
            for(var g = 0; g < goat_data.length; g++) {
                var goat = {
                    PartitionKey: {'_':'goats'},
                    RowKey: {'_':goat_data[g].id.toString()},
                    name: {'_':goat_data[g].name},                                      
                    photo: {'_':goat_data[g].photo},                                  
                    likes: {'_':goat_data[g].likes},                                       
                    desc: {'_':goat_data[g].desc}                                        
                }
                tableService.insertOrReplaceEntity(TABLE_NAME, goat, function (error, result, response) {
                    if(!error){
                        console.log(" #### Added goat to table: %o ", result)
                    } 
                });         
                           
            }
        } else {
            if(error.statusCode == 409) { console.log(" ### Table still being deleted, retry in 10sec... "); setTimeout(createTable, 10000); }
        }
    });
}

