const assert = require('assert');
const {
  isCharacterType
} = require('../src/lib.js');

describe("isCharacterType",function(){
  it("should return true when input contains -c",function(){
    assert.deepEqual(isCharacterType('-c'),true);
    assert.deepEqual(isCharacterType('-c0'),true);
    assert.deepEqual(isCharacterType('-c10'),true);
  })
  it("should return false when input not contains -c",function(){
    assert.deepEqual(isCharacterType(''),false);
    assert.deepEqual(isCharacterType('-'),false);
    assert.deepEqual(isCharacterType('-n'),false);
    assert.deepEqual(isCharacterType('10'),false);
  })

})
