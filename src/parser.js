const isCharacterType = function(string) {
  let firstTwoCharacters = string.slice(0, 2);
  return firstTwoCharacters == "-c";
};

const findType = function(arg) {
  if (isCharacterType(arg)) {
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
  let isType = string[0] == "-";
  let isNumber = +string;
  return !isType && !isNumber;
};

const findFileNames = function(args) {
  let fileNames = args.filter(isFile);
  return fileNames;
};

const parse = function(args) {
  let type = findType(args[0]);
  let range = findRange(args[0], args[1]);
  let fileNames = findFileNames(args);
  return { type, range, fileNames };
};

module.exports = {
  parse,
  isCharacterType,
  findType,
  findRange,
  isFile,
  findFileNames
};
