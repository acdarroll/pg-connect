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

const findPeople = function (searchName) {

  console.log("Searching...");
  return knex.select()
    .from('famous_people')
    .where('first_name', searchName)
    .orWhere('last_name', searchName)
    .then( (rows) => {
      knex.destroy();
      return formatResults(rows, searchName);
    }).catch(function(error) {
      console.error(error);
    });
};

if(searchName) {
  findPeople(searchName).then((result) => {
    console.log(result);
  });
} else {
  console.log("Please give a name to search for");
}
