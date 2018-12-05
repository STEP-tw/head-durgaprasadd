const assert = require('assert');
const {
  isCharacterType,
  findType,
  organiseInputs,
  isNumberFound,
  findRange,
  isFile,
  findFileNames
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

describe("isFile",function(){
  it("should return true when input is text",function(){
    assert.deepEqual(isFile('node.js'),true);
    assert.deepEqual(isFile('node'),true);
    assert.deepEqual(isFile('js'),true);
  })
  it("should return false when input is type or number",function(){
    assert.deepEqual(isFile('10'),false);
    assert.deepEqual(isFile('-c'),false);
    assert.deepEqual(isFile('-n10'),false);
  })

})

describe("findFileNames",function(){
  it("should return empty array when input is empty array",function(){
    assert.deepEqual(findFileNames([]),[]);
  })
  it("should return empty array when input not contains any fileNames",function(){
    assert.deepEqual(findFileNames(['10']),[]);
    assert.deepEqual(findFileNames(['-n']),[]);
    assert.deepEqual(findFileNames(['-c5']),[]);
  })
  it("should return array of fileNames when input contains fileNames",function(){
    assert.deepEqual(findFileNames(['text']),['text']);
    assert.deepEqual(findFileNames(['file']),['file']);
    assert.deepEqual(findFileNames(['text','file']),['text','file']);
  })
})

describe("organiseInputs",function(){
  it("should return default object of type n ,range 10 and array of fileNames when input array not contains any type and range",function(){
    assert.deepEqual(organiseInputs(['']),{type:'n',range:10,fileNames:['']});
    assert.deepEqual(organiseInputs(['text']),{type:'n',range:10,fileNames:['text']});
    assert.deepEqual(organiseInputs(['-']),{type:'n',range:10,fileNames:[]});
  })

  it("should return object of type c ,default range 10 and array of fileNames when input array contains type of -c and not range",function(){
    assert.deepEqual(organiseInputs(['-c']),{type:'c',range:10,fileNames:[]});
    assert.deepEqual(organiseInputs(['-c','text']),{type:'c',range:10,fileNames:['text']});
  })

  it("should return object of type c, given range and empty array of fileNames when input array contains type of -c and range",function(){
    assert.deepEqual(organiseInputs(['-c10']),{type:'c',range:10,fileNames:[]});
    assert.deepEqual(organiseInputs(['-c','5']),{type:'c',range:5,fileNames:[]});
    assert.deepEqual(organiseInputs(['-c','-5']),{type:'c',range:5,fileNames:[]});
  })

  it("should return object of type n, given range and empty array of fileNames when input array contains type of -n and range",function(){
    assert.deepEqual(organiseInputs(['-n1']),{type:'n',range:1,fileNames:[]});
    assert.deepEqual(organiseInputs(['-n','5']),{type:'n',range:5,fileNames:[]});
    assert.deepEqual(organiseInputs(['-n','-5']),{type:'n',range:5,fileNames:[]});
  })

})
