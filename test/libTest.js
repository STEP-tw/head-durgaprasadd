const assert = require('assert');
const {
  isCharacterType,
  findType,
  organiseInputs,
  isNumberFound,
  findRange
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

describe("isNumberFound",function(){
  it("should return number when input contains number",function(){
    assert.deepEqual(isNumberFound('-n10'),10);
    assert.deepEqual(isNumberFound('-10'),10);
    assert.deepEqual(isNumberFound('10'),10);
  })
  it("should return NaN when input not contains any number",function(){
    assert.deepEqual(''+isNumberFound('c'),'NaN');
    assert.deepEqual(''+isNumberFound('-n'),'NaN');
    assert.deepEqual(''+isNumberFound('text'),'NaN');
  })
})

describe("findRange",function(){
  it("should return default 10 when input not contains any number",function(){
    assert.deepEqual(findRange([]),10);
    assert.deepEqual(findRange(['n']),10);
    assert.deepEqual(findRange(['n','c']),10);
  })
  it("should return number present in input when input contains number",function(){
    assert.deepEqual(findRange(['1']),1);
    assert.deepEqual(findRange(['-10']),10);
    assert.deepEqual(findRange(['-n10','c']),10);
  })
})

describe("organiseInputs",function(){
  it("should return default object of type n and range 10 when input array not contains any type and range",function(){
    assert.deepEqual(organiseInputs(['']),{type:'n',range:10});
    assert.deepEqual(organiseInputs(['text']),{type:'n',range:10});
    assert.deepEqual(organiseInputs(['-']),{type:'n',range:10});
  })
  it("should return object of type c and default range 10 when input array contains type of -c and not range",function(){
    assert.deepEqual(organiseInputs(['-c']),{type:'c',range:10});
    assert.deepEqual(organiseInputs(['-c','text']),{type:'c',range:10});
  })
  it("should return object of type c and given range when input array contains type of -c and range",function(){
    assert.deepEqual(organiseInputs(['-c10']),{type:'c',range:10});
    assert.deepEqual(organiseInputs(['-c','5']),{type:'c',range:5});
    assert.deepEqual(organiseInputs(['-c','-5']),{type:'c',range:5});
  })
  it("should return object of type n and given range when input array contains type of -n and range",function(){
    assert.deepEqual(organiseInputs(['-n10']),{type:'n',range:10});
    assert.deepEqual(organiseInputs(['-n','5']),{type:'n',range:5});
    assert.deepEqual(organiseInputs(['-n','-5']),{type:'n',range:5});
  })

})
