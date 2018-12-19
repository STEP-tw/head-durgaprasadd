const { generateOutput } = require("./src/lib.js");
const fs = require("fs");
console.log(generateOutput(process.argv.slice(2), fs));
