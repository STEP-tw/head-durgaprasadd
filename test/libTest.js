const assert = require("assert");

const { getSelectedData, tail, head } = require("../src/lib.js");

const fileContents = {
  file1: "sample\ntext",
  file2: "abcdefghijklmnopqr".split("").join("\n")
};

const fs = {
  readFileSync: function(fileName) {
    return fileContents[fileName];
  },
  existsSync: function(fileName) {
    return Object.keys(fileContents).includes(fileName);
  }
};

describe("getSelectedData", function() {
  it("should return empty string when range is 0", function() {
    let actual = getSelectedData("c", 0, "sampleText", "head");
    let expected = "";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("n", 0, "sample\nText", "head");
    expected = "";
    assert.deepEqual(actual, expected);
  });

  it("should return given range of characters in a string when type is c", function() {
    let actual = getSelectedData("c", 1, "sampleText", "head");
    let expected = "s";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("c", 2, "sample\nText", "head");
    expected = "sa";
    assert.deepEqual(actual, expected);
  });

  it("should return given range of lines in a string when type is n", function() {
    let actual = getSelectedData("n", 1, "sample\nText", "head");
    let expected = "sample";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("n", 2, "sample\nText", "head");
    expected = "sample\nText";
    assert.deepEqual(actual, expected);
  });
});

describe("head", function() {
  it("should return error message for wrong range", function() {
    let actual = head(["-n", "-10", "something"]);
    let expected = "head: illegal line count -- -10";
    assert.deepEqual(actual, expected);

    actual = head(["-n", "-10x", "something"]);
    expected = "head: illegal line count -- -10x";
    assert.deepEqual(actual, expected);

    actual = head(["-c", "-10", "something"]);
    expected = "head: illegal byte count -- -10";
    assert.deepEqual(actual, expected);

    actual = head(["-c", "-10x", "something"]);
    expected = "head: illegal byte count -- -10x";
    assert.deepEqual(actual, expected);
  });

  it("should return range of characters in file", function() {
    let actual = head(["-c", "1", "file1"], fs);
    let expected = "s\n";
    assert.deepEqual(actual, expected);

    actual = head(["-c", "4", "file1"], fs);
    expected = "samp\n";
    assert.deepEqual(actual, expected);

    actual = head(["-c", "10", "file1"], fs);
    expected = "sample\ntex\n";
    assert.deepEqual(actual, expected);
  });

  it("should return range of lines in file", function() {
    let actual = head(["-n", "1", "file1"], fs);
    let expected = "sample\n";
    assert.deepEqual(actual, expected);

    actual = head(["-n", "4", "file2"], fs);
    expected = "a\nb\nc\nd\n";
    assert.deepEqual(actual, expected);

    actual = head(["-n", "10", "file2"], fs);
    expected = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n";
    assert.deepEqual(actual, expected);
  });

  it("should return error message for missing file", function() {
    let actual = head(["-n", "10", "text"], fs);
    let expected = "head: text: No such file or directory";
    assert.deepEqual(actual, expected);
  });
});

describe("tail", () => {
  it("should return nothing for range 0", () => {
    let actual = tail(["-n0", "file"], fs);
    let expected = "";
    assert.deepEqual(actual, expected);
  });

  it("should return error for invalid values of -n and -c", () => {
    let actual = tail(["-n0x", "file"], fs);
    let expected = "tail: illegal offset -- 0x";
    assert.deepEqual(actual, expected);

    actual = tail(["-c0x", "file"], fs);
    expected = "tail: illegal offset -- 0x";
    assert.deepEqual(actual, expected);
  });
});
