const { parse } = require("./parser.js");

const getSelectedData = function(option, range, content, command) {
  const delimiter = { byte: "", line: "\n" };
  const rangeBound = { head: [0, range], tail: [-range] };
  return content
    .split(delimiter[option])
    .slice(rangeBound[command][0], rangeBound[command][1])
    .join(delimiter[option]);
};

const addHeader = function(NoOfFiles, fileName, data) {
  if (NoOfFiles > 1) {
    header = `==> ${fileName} <==`;
    return `${header}\n${data}\n`;
  }
  return data;
};

const errorMessageForIllegalCount = function(command, option, range) {
  const message = {
    head: { byte: "byte count", line: "line count" },
    tail: { byte: "offset", line: "offset" }
  };
  return `${command}: illegal ${message[command][option]} -- ${range}`;
};

const errorMessageForMissingFiles = function(command, fileName) {
  return `${command}: ${fileName}: No such file or directory`;
};

const getOutput = function(fs, command, option, range, NoOfFiles, fileName) {
  if (fs.existsSync(fileName)) {
    let content = fs.readFileSync(fileName, "utf-8");
    let data = getSelectedData(option, range, content, command);
    return addHeader(NoOfFiles, fileName, data);
  }
  return errorMessageForMissingFiles(command, fileName);
};

const generateOutput = function(args, fs, command = "head") {
  let { option, range, fileNames } = parse(args);

  if (range <= 0 || isNaN(range)) {
    return errorMessageForIllegalCount(command, option, range);
  }

  let output = fileNames.map(
    getOutput.bind(null, fs, command, option, range, fileNames.length)
  );

  return output.join("\n");
};

const tail = function(args, fs) {
  let { range } = parse(args);
  if (+range == 0) {
    return "";
  }
  return generateOutput(args, fs, "tail");
};

module.exports = {
  getSelectedData,
  tail,
  generateOutput,
  addHeader,
  errorMessageForIllegalCount,
  errorMessageForMissingFiles
};
