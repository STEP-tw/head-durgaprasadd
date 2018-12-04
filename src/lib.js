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

const organiseInputs = function(args){
  let type = findType(args[0]);
  return { type }
}

module.exports = {
  isCharacterType,
  findType,
  organiseInputs
}
