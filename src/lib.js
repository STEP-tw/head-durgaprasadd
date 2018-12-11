const { organiseInputs } = require("./parser.js");

const getSelectedData = function(type, range, content,command) {
  let delimiter = { c: "", n: "\n" };
  let data = content.split(delimiter[type]);
  range = { head: [0, range], tail: [-range] };
  return data.slice(range[command][0], range[command][1]).join(delimiter[type]);
};

const isExist = function(existsFile, fileName) {
  return existsFile(fileName);
};

const getOutput = function(
  readFile,
  existsFile,
  command,
  { type, range },
  result,
  fileName
) {
  if (isExist(existsFile, fileName)) {
    let content = readFile(fileName, "utf-8");
    let data = getSelectedData(type, range, content, command);
    let headline = "==> " + fileName + " <==";
    result.push(headline + "\n" + data + "\n");
    return result;
  }
  let message = command + ": " + fileName + ": No such file or directory";
  result.push(message);
  return result;
};

const head = function(args, readFile, existsFile, command = "head") {
  let { type, range, fileNames } = organiseInputs(args);
  let message = {
    head: { c: "byte count", n: "line count" },
    tail: { c: "offset", n: "offset" }
  };
  if (!(+range > 0)) {
    return command + ": illegal " + message[command][type] + " -- " + range;
  }
  let output = fileNames.reduce(
    getOutput.bind(null, readFile, existsFile, command, { type, range }),
    []
  );
  if (output.length == 1 && isExist(existsFile, fileNames[0])) {
    output = output[0].split("\n").slice(1);
  }
  return output.join("\n");
};

const tail = function(args, readFile, existsFile) {
  let { range } = organiseInputs(args);
  if (+range == 0) {
    return "";
  }
  return head(args, readFile, existsFile, "tail");
};

module.exports = {
  getSelectedData,
  head,
  tail
};
