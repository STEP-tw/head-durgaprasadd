const {head} = require('./src/lib.js');
const {readFileSync, existsSync} = require('fs');
console.log(head(process.argv.slice(2), readFileSync, existsSync));
