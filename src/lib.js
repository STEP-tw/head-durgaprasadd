const { parse } = require("./parser.js");

const {
  errorMessageForIllegalCount,
  errorMessageForMissingFiles
} = require("./errorHandling.js");

const getSelectedData = function(option, range, content, command) {
  const delimiter = { byte: "", line: "\n" };
  const rangeBound = { head: [0, range], tail: [-range] };
  return content
    .split(delimiter[option])
    .slice(rangeBound[command][0], rangeBound[command][1])
    .join(delimiter[option]);
};

const addHeader = function(numberOfFiles, fileName, data) {
  if (numberOfFiles > 1) {
    const header = `==> ${fileName} <==`;
    return `${header}\n${data}\n`;
  }
  return data;
};

const getOutput = function(
  fs,
  command,
  option,
  range,
  numberOfFiles,
  fileName
) {
  if (fs.existsSync(fileName)) {
    let content = fs.readFileSync(fileName, "utf-8");
    let data = getSelectedData(option, range, content, command);
    return addHeader(numberOfFiles, fileName, data);
  }
  return errorMessageForMissingFiles(command, fileName);
};

const generateOutput = function(args, fs, command) {
  let { option, range, fileNames } = parse(args);

  let output = fileNames.map(
    getOutput.bind(null, fs, command, option, range, fileNames.length)
  );

  return output.join("\n");
};

const head = function(args, fs) {
  let { range, option } = parse(args);
  if (range <= 0 || isNaN(range)) {
    return errorMessageForIllegalCount("head", option, range);
  }
  return generateOutput(args, fs, "head");
};

const tail = function(args, fs) {
  let { range, option } = parse(args);
  if (isNaN(range)) {
    return errorMessageForIllegalCount("tail", option, range);
  }
  if (range == 0) {
    return "";
  }
  return generateOutput(args, fs, "tail");
};

module.exports = {
  getSelectedData,
  tail,
  generateOutput,
  addHeader,
  head
};
