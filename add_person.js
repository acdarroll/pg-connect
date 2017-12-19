let settings = require('./settings');

let knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let insertArgs = process.argv.slice(2);

const insertPerson = function(firstname, lastname, birthdate) {
  knex('famous_people').insert({
    first_name: firstname,
    last_name: lastname,
    birthdate
  }).then( () => {
    knex.destroy();
    console.log("Inesrt successful");
    console.log("Server shut down");
  }).catch(function(error) {
    console.error(error);
  });

};

if(insertArgs.length === 3) {
  insertPerson(insertArgs[0], insertArgs[1], insertArgs[2]);
} else {
  console.log("Please provide a firstname, lastname, and DOB");
}
