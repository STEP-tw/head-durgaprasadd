const assert = require('assert');
const {
  isCharacterType,
  findType
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

describe("findType",function(){
  it("should return c when input contains -c",function(){
    assert.deepEqual(findType('-c'),'c');
    assert.deepEqual(findType('-c0'),'c');
    assert.deepEqual(findType('-c10'),'c');
  })
  it("should return n when input not contains -c",function(){
    assert.deepEqual(findType(''),'n');
    assert.deepEqual(findType('-'),'n');
    assert.deepEqual(findType('-n'),'n');
    assert.deepEqual(findType('-n10'),'n');
  })

})
