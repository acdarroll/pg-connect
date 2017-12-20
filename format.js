 module.exports = function(result, searchName) {

  const padDate = function(date) {
    if(date < 10) {
      date = '0' + date;
    }
    return date;
  };

  const formatDate = function(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${padDate(month)}-${padDate(day)}`;
  };

  let results = `Found ${result.length} person(s) by the name '${searchName}:'`;
  if(result[0]) {
    result.forEach( (person, i) => {
      results += `
- ${ i + 1 }: ${person.first_name} ${person.last_name}, born '${formatDate(person.birthdate)}'`;
    });
  }
  return results;
};