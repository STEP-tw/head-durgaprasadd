const {
  organiseInputs 
} = require('./src/lib.js');

const readFile = require('fs').readFileSync;

const main = function(args){
  const headDetails = organiseInputs(args);
  return headDetails;
}

console.log(main(process.argv.slice(2)));
