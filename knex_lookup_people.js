let settings = require('./settings');
let formatResults = require('./format');

let knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let searchName = process.argv[2];

const findPerson = function (searchName) {
  console.log("Searching...");
  knex.select()
  .from('famous_people')
  .where('first_name', searchName)
  .orWhere('last_name', searchName)
  .then( (rows) => {
    formatResults(rows, searchName);
    knex.destroy();
  })
  .then( () => { console.log("Server shut down");
  }).catch(function(error) {
    console.error(error);
  });
};

if(searchName) {
  findPerson(searchName);
} else {
  console.log("Please give a name to search for");
}
