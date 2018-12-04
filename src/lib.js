const isCharacterType = function(string){
  let firstTwoCharacters = string.slice(0,2);
  return firstTwoCharacters == '-c';
}

module.exports = {
  isCharacterType
}
