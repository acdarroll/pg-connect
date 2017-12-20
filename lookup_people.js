const pg = require("pg");
const settings = require("./settings"); // settings.json
let formatResults = require('./format');

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

const findPeople = function(searchName, query) {
  return new Promise( (resolve, reject) => {
    client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log('Searching...');

      client.query(query, [searchName], (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }

        client.end();
        return resolve(formatResults(result.rows));
      });
    });
  });
};

if(searchName) {
  findPeople(searchName, query).then((result) => {
    console.log("Result:", result);
  });
} else {
  console.log("Please give a name to search for");
}


