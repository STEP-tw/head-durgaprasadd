const isCharacterType = function(string){
  let firstTwoCharacters = string.slice(0,2);
  return firstTwoCharacters == '-c';
}

const findType = function(arg){
  if(isCharacterType(arg)){
    return 'c';
  }
  return 'n';
}

const isNumberFound = function(string){
  let isNumber = +string.slice(1) || +string.slice(2) || +string;
  return isNumber;
}

const findRange = function(args){
  let range = ''+args.filter(isNumberFound);
  range = +range||+range.slice(2)||10;
  return Math.max(range,-range);
}

const isFile = function(string){
  let isType = string[0]=='-';
  let isNumber = +string;
  return !isType && !isNumber;
}

const findFileNames = function(args){
  let fileNames = args.filter(isFile);
  return fileNames;
}

const organiseInputs = function(args){
  let type = findType(args[0]);
  let range = findRange(args.slice(0,2));
  return { type, range }
}

module.exports = {
  isCharacterType,
  findType,
  organiseInputs,
  isNumberFound,
  findRange,
  isFile,
  findFileNames
}
