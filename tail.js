const { tail } = require("./src/lib.js");
const fs = require("fs");
console.log(tail(process.argv.slice(2), fs));
