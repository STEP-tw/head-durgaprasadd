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
    assert.deepEqual(getSelectedData("c", 0, "sampleText", "head"), "");
    assert.deepEqual(getSelectedData("n", 0, "sample\nText", "head"), "");
  });
  it("should return given range of characters in a string when type is c", function() {
    assert.deepEqual(getSelectedData("c", 1, "sampleText", "head"), "s");
    assert.deepEqual(getSelectedData("c", 2, "sample\nText", "head"), "sa");
  });
  it("should return given range of lines in a string when type is n", function() {
    assert.deepEqual(getSelectedData("n", 1, "sample\nText", "head"), "sample");
    assert.deepEqual(
      getSelectedData("n", 2, "sample\nText", "head"),
      "sample\nText"
    );
  });
});

describe("head", function() {
  it("should return error message for wrong range", function() {
    assert.deepEqual(
      head(["-n", "-10", "something"]),
      "head: illegal line count -- -10"
    );
    assert.deepEqual(
      head(["-n", "-10x", "something"]),
      "head: illegal line count -- -10x"
    );
    assert.deepEqual(
      head(["-c", "-10", "something"]),
      "head: illegal byte count -- -10"
    );
    assert.deepEqual(
      head(["-c", "-10x", "something"]),
      "head: illegal byte count -- -10x"
    );
  });
  it("should return range of characters in file", function() {
    assert.deepEqual(head(["-c", "1", "file1"], fs), "s\n");
    assert.deepEqual(head(["-c", "4", "file1"], fs), "samp\n");
    assert.deepEqual(head(["-c", "10", "file1"], fs), "sample\ntex\n");
  });
  it("should return range of lines in file", function() {
    assert.deepEqual(head(["-n", "1", "file1"], fs), "sample\n");
    assert.deepEqual(head(["-n", "4", "file2"], fs), "a\nb\nc\nd\n");
    assert.deepEqual(
      head(["-n", "10", "file2"], fs),
      "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"
    );
  });
  it("should return error message for missing file", function() {
    assert.deepEqual(
      head(["-n", "10", "text"], fs),
      "head: text: No such file or directory"
    );
  });
});
describe("tail", () => {
  it("should return nothing for range 0", () => {
    assert.deepEqual(tail(["-n0", "file"], fs), "");
  });
  it("should return error for invalid values of -n and -c", () => {
    assert.deepEqual(tail(["-n0x", "file"], fs), "tail: illegal offset -- 0x");
    assert.deepEqual(tail(["-c0x", "file"], fs), "tail: illegal offset -- 0x");
  });
});
