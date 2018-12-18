const { parse } = require("./parser.js");

const getSelectedData = function(option, range, content, command) {
  const delimiter = { byte: "", line: "\n" };
  const rangeBound = { head: [0, range], tail: [-range] };
  return content
    .split(delimiter[option])
    .slice(rangeBound[command][0], rangeBound[command][1])
    .join(delimiter[option]);
};

const getOutput = function(fs, command, { option, range }, result, fileName) {
  if (fs.existsSync(fileName)) {
    let content = fs.readFileSync(fileName, "utf-8");
    let data = getSelectedData(option, range, content, command);
    let headline = "==> " + fileName + " <==";
    result.push(headline + "\n" + data + "\n");
    return result;
  }
  let message = command + ": " + fileName + ": No such file or directory";
  result.push(message);
  return result;
};

const head = function(args, fs, command = "head") {
  let { option, range, fileNames } = parse(args);
  let message = {
    head: { byte: "byte count", line: "line count" },
    tail: { byte: "offset", line: "offset" }
  };
  if (!(+range > 0)) {
    return command + ": illegal " + message[command][option] + " -- " + range;
  }
  let output = fileNames.reduce(
    getOutput.bind(null, fs, command, { option, range }),
    []
  );
  if (output.length == 1 && fs.existsSync(fileNames[0])) {
    output = output[0].split("\n").slice(1);
  }
  return output.join("\n");
};

const tail = function(args, fs) {
  let { range } = parse(args);
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
