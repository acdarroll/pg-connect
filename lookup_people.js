const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let searchName = process.argv[2];
let query = "SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1;";

const formatResults = function (result) {
  console.log(`Found ${result.length} person(s) by the name '${searchName}:'`);
    if(result[0]) {
      result.forEach( (person, i) => {
        console.log(`- ${ i + 1 }: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
      });
    }
};

const findPerson = function(searchName, query) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log('Searching...');

    client.query(query, [searchName], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      formatResults(result.rows);

      client.end();
    });
  });
};

if(searchName) {
  findPerson(searchName, query);
} else {
  console.log("Please give a name to search for");
}


