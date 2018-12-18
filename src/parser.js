const isCharacterOption = function(string) {
  let firstTwoCharacters = string.slice(0, 2);
  return firstTwoCharacters == "-c";
};

const findOption = function(arg) {
  if (isCharacterOption(arg)) {
    return "c";
  }
  return "n";
};

const findRange = function(firstArg, SecondArg) {
  let range;
  if (firstArg[0] == "-") {
    range = firstArg.slice(1);
  }
  let firstTwoCharacters = firstArg.slice(0, 2);
  if (firstTwoCharacters == "-c" || firstTwoCharacters == "-n") {
    range = firstArg.slice(2) || SecondArg;
  }
  return range || 10;
};

const isFile = function(string) {
  let isOption = string[0] == "-";
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
