const fileio = require('fs');
const csv = require('csv-parser');
const csvObjects = [];
const regValidTypes = [
  "student",
  "password",
  "username",
  "email",
  "previous",
  "",
  "",
  "",
  "",
  "",
];
const regExPatterns = [
  RegExp('^([0-9]{9}|[0-9]{3}\s[0-9]{3}\s[0-9]{3})$'),
  RegExp('^[\s]*([\x20-\x7e]{12,})$'),
  RegExp('','g'),
  RegExp('','g'),
  RegExp('','g'),
  RegExp('','g'),
  RegExp('','g'),
  RegExp('','g'),
  RegExp('^[01]+$','g'),
  RegExp('(<[a-zA-Z]*>|<\/[a-zA-Z]*>)','g')
];

fileio.createReadStream('input.txt')
  .pipe(csv(["ValidType","Data"]))
  .on('data', function (row){
    row.Data = row.Data.trim();
    csvObjects.push(row);
  })
  .on('end', function(error){
    if (error) throw error;
    console.log(csvObjects);
  });
