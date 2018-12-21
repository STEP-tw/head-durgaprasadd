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

module.exports = { errorMessageForIllegalCount, errorMessageForMissingFiles };
