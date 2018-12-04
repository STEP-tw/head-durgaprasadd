const assert = require('assert');
const {
  isCharacterType,
  findType,
  organiseInputs
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

describe("organiseInputs",function(){
  it("should return object of type c when input array contains -c",function(){
    assert.deepEqual(organiseInputs(['-c']),{type:'c'});
    assert.deepEqual(organiseInputs(['-c10','text']),{type:'c'});
    assert.deepEqual(organiseInputs(['-c','-n']),{type:'c'});
  })
  it("should return object of type n when input array not contains -c",function(){
    assert.deepEqual(organiseInputs(['']),{type:'n'});
    assert.deepEqual(organiseInputs(['-n']),{type:'n'});
    assert.deepEqual(organiseInputs(['-10','text']),{type:'n'});
    assert.deepEqual(organiseInputs(['-n','-n']),{type:'n'});
  })

})
