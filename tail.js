const { tail } = require("./src/lib.js");
const { readFileSync, existsSync } = require("fs");
console.log(tail(process.argv.slice(2), readFileSync, existsSync));