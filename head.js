const { head } = require("./src/lib.js");
const fs = require("fs");
console.log(head(process.argv.slice(2), fs));
