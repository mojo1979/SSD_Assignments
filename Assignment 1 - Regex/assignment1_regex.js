// Name: John Mo | SID : 991 345 314 | Title: Assignment 1 - RegEx

const fileio = require('fs');
const csv = require('csv-parser');
const csvObjects = [];
const regExPatterns = {
  student : /^([0-9]{9}|[0-9]{3}\s[0-9]{3}\s[0-9]{3})$/,
  password : /^[\x20-\x7e]{12,}$/,
  username : /^[a-zA-Z0-9]{3,20}$/,
  email : /^[A-Z0-9]{3,20}@[A-Z0-9]{3,20}.[A-Z0-9]{3,20}$/i,
  phone : /^([0-9]{10}|[0-9]{3}[.-][0-9]{3}[.-][0-9]{4}|\([0-9]{3}\)[0-9]{3}-[0-9]{4})$/,
  postal : /^([A-Z][0-9][A-Z][0-9][A-Z][0-9]|[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]})$/i,
  address : /^[a-zA-Z0-9.\-\s]+$/,
  binary : /^[01]+$/,
  bio : /^(?!.*(<[A-Z"%=:_\/\-\s]*>|<\/[A-Z"%=:_\/\-\s]*>))/i
};

fileio.createReadStream('input.txt')
  .pipe(csv(["ValidType","Data"]))
  .on('data', function (row) {
    row.Data = row.Data.trim();
    csvObjects.push(row);
  })
  .on('end', function(error){
    if (error) throw error;
    for (var i = 0; i < csvObjects.length; i++) {
      if (csvObjects[i].ValidType === 'previous' && i > 0) {
        if (csvObjects[i].Data === csvObjects[i-1].Data) console.log('yes');
        else console.log('no');
      } else if (regExPatterns[csvObjects[i].ValidType].test(csvObjects[i].Data)) console.log('yes');
      else console.log('no');
    }
  });
