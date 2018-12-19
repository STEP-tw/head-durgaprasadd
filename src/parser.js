const isCharacterOption = function(string) {
  return string.startsWith("-c");
};

const findOption = function(arg) {
  if (isCharacterOption(arg)) {
    return "byte";
  }
  return "line";
};

const findRange = function(firstArg, secondArg) {
  let range;
  if (firstArg.startsWith("-")) {
    range = firstArg.slice(1);
  }
  if (firstArg.startsWith("-c") || firstArg.startsWith("-n")) {
    range = firstArg.slice(2) || secondArg;
  }
  return range || 10;
};

const isFile = function(string) {
  let isOption = string.startsWith("-");
  let isNumber = +string;
  return !isOption && !isNumber;
};

const findFileNames = function(args) {
  let fileNames = args.filter(isFile);
  return fileNames;
};

const parse = function(args) {
  let option = findOption(args[0]);
  let range = findRange(args[0], args[1]);
  let fileNames = findFileNames(args);
  return { option, range, fileNames };
};

module.exports = {
  parse,
  isCharacterOption,
  findOption,
  findRange,
  isFile,
  findFileNames
};
