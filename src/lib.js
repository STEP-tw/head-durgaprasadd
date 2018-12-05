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
  let fileNames = findFileNames(args);
  return { type, range, fileNames }
}

const getSelectedData = function(type,range,content){
  let delimiter = { c:'',n:'\n'};
  let data = content.split(delimiter[type]);
  return data.slice(0,range).join(delimiter[type]);
}

const head = function(args,readFile){
  let { type, range, fileNames } = organiseInputs(args);
  let contents = fileNames.map(fileName => readFile(fileName,'utf-8'));
  let output = contents.map(getSelectedData.bind(null,type,range));
  return output.join('\n');
}

module.exports = {
  isCharacterType,
  findType,
  organiseInputs,
  isNumberFound,
  findRange,
  isFile,
  findFileNames,
  getSelectedData,
  head
}
