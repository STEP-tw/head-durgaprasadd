const isCharacterType = function(string) {
  let firstTwoCharacters = string.slice(0, 2);
  return firstTwoCharacters == '-c';
};

const findType = function(arg) {
  if (isCharacterType(arg)) {
    return 'c';
  }
  return 'n';
};

const findRange = function(firstArg, SecondArg) {
  let range;
  if (firstArg[0] == '-') {
    range = firstArg.slice(1);
  }
  let firstTwoCharacters = firstArg.slice(0, 2);
  if (firstTwoCharacters == '-c' || firstTwoCharacters == '-n') {
    range = firstArg.slice(2) || SecondArg;
  }
  return range || 10;
};

const isFile = function(string) {
  let isType = string[0] == '-';
  let isNumber = +string;
  return !isType && !isNumber;
};

const findFileNames = function(args) {
  let fileNames = args.filter(isFile);
  return fileNames;
};

const organiseInputs = function(args) {
  let type = findType(args[0]);
  let range = findRange(args[0], args[1]);
  let fileNames = findFileNames(args);
  return {type, range, fileNames};
};

const getSelectedData = function(type, range, content) {
  let delimiter = {c: '', n: '\n'};
  let data = content.split(delimiter[type]);
  return data.slice(0, range).join(delimiter[type]);
};

const isExist = function(existsFile, fileName) {
  return existsFile(fileName);
};

const getOutput = function(
  readFile,
  existsFile,
  {type, range},
  result,
  fileName,
) {
  if (isExist(existsFile, fileName)) {
    let content = readFile(fileName, 'utf-8');
    let data = getSelectedData(type, range, content);
    let headline = '==> ' + fileName + ' <==';
    result.push(headline + '\n' + data + '\n');
    return result;
  }
  let message = 'head: ' + fileName + ': No such file or directory';
  result.push(message);
  return result;
};

const head = function(args, readFile, existsFile) {
  let {type, range, fileNames} = organiseInputs(args);
  let message = {c: 'byte', n: 'line'};
  if (!(+range > 0)) {
    return 'head: illegal ' + message[type] + ' count -- ' + range;
  }
  let output = fileNames.reduce(
    getOutput.bind(null, readFile, existsFile, {type, range}),
    [],
  );
  if (output.length == 1 && isExist(existsFile, fileNames[0])) {
    output = output[0].split('\n').slice(1);
  }
  return output.join('\n');
};

module.exports = {
  isCharacterType,
  findType,
  organiseInputs,
  findRange,
  isFile,
  findFileNames,
  getSelectedData,
  head,
};
