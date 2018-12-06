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

const findRange = function(firstArg,SecondArg){
  let range;
  if(firstArg[0] == '-'){
    range = firstArg.slice(1);
  }
  if(firstArg.slice(0,2) == '-c' || firstArg.slice(0,2) == '-n'){
    range = firstArg.slice(2) || SecondArg;
  }
  return range || 10;
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
  let range = findRange(args[0],args[1]);
  let fileNames = findFileNames(args);
  return { type, range, fileNames }
}

const getSelectedData = function(type,range,content){
  let delimiter = { c:'',n:'\n'};
  let data = content.split(delimiter[type]);
  return data.slice(0,range).join(delimiter[type]);
}

const organiseOutput = function(output,fileNames){
  if(output.length == 1){
    return output;
  }
  fileNames = fileNames.map(content => '==> '+content+' <==');
  output = output.map(content => fileNames[output.indexOf(content)]+'\n'+content+'\n');
  return output;
}

const head = function(args,readFile){
  let { type, range, fileNames } = organiseInputs(args);
  if(!(+range > 0)){
    return 'head: illegal line count -- '+range;
  }
  let contents = fileNames.map(fileName => readFile(fileName,'utf-8'));
  let output = contents.map(getSelectedData.bind(null,type,range));
  output = organiseOutput(output,fileNames);
  return output.join('\n');
}

module.exports = {
  isCharacterType,
  findType,
  organiseInputs,
  findRange,
  isFile,
  findFileNames,
  getSelectedData,
  head,
  organiseOutput
}
