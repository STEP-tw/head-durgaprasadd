const {
  isCharacterOption,
  findOption,
  parse,
  findRange,
  isFile,
  findFileNames
} = require("../src/parser.js");

const assert = require("assert");

describe("isCharacterOption", function() {
  it("should return true when input contains -c", function() {
    const expected = true;
    let actual = isCharacterOption("-c");
    assert.deepEqual(actual, expected);

    actual = isCharacterOption("-c0");
    assert.deepEqual(actual, expected);

    actual = isCharacterOption("-c10");
    assert.deepEqual(actual, expected);
  });

  it("should return false when input not contains -c", function() {
    const expected = false;
    let actual = isCharacterOption("");
    assert.deepEqual(actual, expected);

    actual = isCharacterOption("-");
    assert.deepEqual(actual, expected);

    actual = isCharacterOption("-n");
    assert.deepEqual(actual, expected);

    actual = isCharacterOption("10");
    assert.deepEqual(actual, expected);
  });
});

describe("findoption", function() {
  it("should return c when input contains -c", function() {
    const expected = "byte";
    let actual = findOption("-c");
    assert.deepEqual(actual, expected);

    actual = findOption("-c0");
    assert.deepEqual(actual, expected);

    actual = findOption("-c10");
    assert.deepEqual(actual, expected);
  });

  it("should return n when input not contains -c", function() {
    const expected = "line";
    let actual = findOption("");
    assert.deepEqual(actual, expected);

    actual = findOption("-");
    assert.deepEqual(actual, expected);

    actual = findOption("-n");
    assert.deepEqual(actual, expected);

    actual = findOption("-n10");
    assert.deepEqual(actual, expected);
  });
});

describe("findRange", function() {
  it("should return default 10 when input not contains any number", function() {
    const expected = 10;
    let actual = findRange("text");
    assert.deepEqual(actual, expected);

    actual = findRange("");
    assert.deepEqual(actual, expected);

    actual = findRange("n");
    assert.deepEqual(actual, expected);
  });

  it("should return number present in input when input contains number", function() {
    let actual = findRange("-1");
    let expected = 1;
    assert.deepEqual(findRange("-1"), 1);

    actual = findRange("-12");
    expected = 12;
    assert.deepEqual(actual, expected);

    actual = findRange("-n5", "text");
    expected = 5;
    assert.deepEqual(actual, expected);
  });
});

describe("isFile", function() {
  it("should return true when input is text", function() {
    const expected = true;
    let actual = isFile("node.js");
    assert.deepEqual(actual, expected);

    actual = isFile("text");
    assert.deepEqual(actual, expected);

    actual = isFile("readme.md");
    assert.deepEqual(actual, expected);
  });

  it("should return false when input is option or number", function() {
    const expected = false;
    let actual = isFile(10);
    assert.deepEqual(actual, expected);

    actual = isFile("-c");
    assert.deepEqual(actual, expected);

    actual = isFile("-n10");
    assert.deepEqual(actual, expected);
  });
});

describe("findFileNames", function() {
  it("should return empty array when input is empty array", function() {
    let actual = findFileNames([]);
    let expected = [];
    assert.deepEqual(actual, expected);
  });

  it("should return empty array when input not contains any fileNames", function() {
    const expected = [];
    let actual = findFileNames(["10"]);
    assert.deepEqual(actual, expected);

    actual = findFileNames(["-n"]);
    assert.deepEqual(actual, expected);

    actual = findFileNames(["-c5"]);
    assert.deepEqual(actual, expected);
  });

  it("should return array of fileNames when input contains fileNames", function() {
    let actual = findFileNames(["text"]);
    let expected = ["text"];
    assert.deepEqual(actual, expected);

    actual = findFileNames(["file"]);
    expected = ["file"];
    assert.deepEqual(actual, expected);

    actual = findFileNames(["text", "file"]);
    expected = ["text", "file"];
    assert.deepEqual(actual, expected);
  });
});

describe("parse", function() {
  it("should return default object of option n ,range 10 and array of fileNames when input array not contains any option and range", function() {
    let actual = parse([""]);
    let expected = { option: "line", range: 10, fileNames: [""] };
    assert.deepEqual(actual, expected);

    actual = parse(["text"]);
    expected = { option: "line", range: 10, fileNames: ["text"] };
    assert.deepEqual(actual, expected);

    actual = parse(["-"]);
    expected = { option: "line", range: "10", fileNames: [] };
    assert.deepEqual(actual, expected);
  });

  it("should return object of option c ,range 10 and array of fileNames when input array contains option of -c and not range", function() {
    let actual = parse(["-c10"]);
    let expected = { option: "byte", range: 10, fileNames: [] };
    assert.deepEqual(actual, expected);

    actual = parse(["-c", "10", "text"]);
    expected = { option: "byte", range: 10, fileNames: ["text"] };
    assert.deepEqual(actual, expected);
  });

  it("should return object of option c, given range and empty array of fileNames when input array contains option of -c and range", function() {
    let actual = parse(["-c0"]);
    let expected = { option: "byte", range: 0, fileNames: [] };
    assert.deepEqual(actual, expected);

    actual = parse(["-c", "5"]);
    expected = { option: "byte", range: 5, fileNames: [] };
    assert.deepEqual(actual, expected);

    actual = parse(["-c", "-5"]);
    expected = { option: "byte", range: -5, fileNames: [] };
    assert.deepEqual(actual, expected);
  });

  it("should return object of option n, given range and empty array of fileNames when input array contains option of -n and range", function() {
    let actual = parse(["-n1"]);
    let expected = { option: "line", range: 1, fileNames: [] };
    assert.deepEqual(actual, expected);

    actual = parse(["-n", "5"]);
    expected = { option: "line", range: 5, fileNames: [] };
    assert.deepEqual(actual, expected);

    actual = parse(["-5"]);
    expected = { option: "line", range: 5, fileNames: [] };
    assert.deepEqual(actual, expected);
  });
});
