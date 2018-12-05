const { head } = require('./src/lib.js');

const readFile = require('fs').readFileSync;

console.log(head(process.argv.slice(2),readFile));
