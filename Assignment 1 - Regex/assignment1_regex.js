// Name: John Mo | SID : 991 345 314 | Title: Assignment 1 - RegEx | NodeJS

const fileio = require('fs');
const csvObjects = [], fileBuffer = [];

const regExPatterns = { // Objectify RegEx Patterns for easy parsing and validating
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

fileio.createReadStream('input.txt').on('data', function (bufferContent){
    fileBuffer.push(bufferContent);
  }).on('end', function(error) {
    if (error) throw error;
    const lines = fileBuffer[0].toString().split('\n'); //Split the file into lines

    for (var k = 0; k < lines.length; k++){ // Split the strings and put them into objects
      if (lines[k] !== '' && lines[k].indexOf(',') !== -1 ){ //ignore empty and invalid lines
        var lineAtr = lines[k].split(/,(.+)/); // split at first comma, rest is data
        csvObjects.push({ ValidType : lineAtr[0], Data : lineAtr[1].trim() }); // Push resultant csv object to list
      }
    }

    for (var i = 0; i < csvObjects.length; i++) { // Iterate thru each object and test regex pattern
      if (csvObjects[i].ValidType === 'previous' && i > 0) // Previous is weird, just compare previous data?
        if (csvObjects[i].Data === csvObjects[i-1].Data) console.log('yes');
        else console.log('no');
      else if (!regExPatterns.hasOwnProperty(csvObjects[i].ValidType)) console.log('Unknown RegEx Pattern ['+csvObjects[i].ValidType+']');
      else if (regExPatterns[csvObjects[i].ValidType].test(csvObjects[i].Data)) console.log('yes');
      else console.log('no');
    }
  });
