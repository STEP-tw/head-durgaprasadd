const { organiseInputs } = require("./parser.js");

const getSelectedData = function(type, range, content, command) {
  let delimiter = { c: "", n: "\n" };
  let data = content.split(delimiter[type]);
  range = { head: [0, range], tail: [-range] };
  let selectedData = data
    .slice(range[command][0], range[command][1])
    .join(delimiter[type]);
  return selectedData;
};

const getOutput = function(fs, command, { type, range }, result, fileName) {
  if (fs.existsSync(fileName)) {
    let content = fs.readFileSync(fileName, "utf-8");
    let data = getSelectedData(type, range, content, command);
    let headline = "==> " + fileName + " <==";
    result.push(headline + "\n" + data + "\n");
    return result;
  }
  let message = command + ": " + fileName + ": No such file or directory";
  result.push(message);
  return result;
};

const head = function(args, fs, command = "head") {
  let { type, range, fileNames } = organiseInputs(args);
  let message = {
    head: { c: "byte count", n: "line count" },
    tail: { c: "offset", n: "offset" }
  };
  if (!(+range > 0)) {
    return command + ": illegal " + message[command][type] + " -- " + range;
  }
  let output = fileNames.reduce(
    getOutput.bind(null, fs, command, { type, range }),
    []
  );
  if (output.length == 1 && isExist(fs.existsSync, fileNames[0])) {
    output = output[0].split("\n").slice(1);
  }
  return output.join("\n");
};

const tail = function(args, fs) {
  let { range } = organiseInputs(args);
  if (+range == 0) {
    return "";
  }
  return head(args, fs, "tail");
};

module.exports = {
  getSelectedData,
  head,
  tail
};
