const assert = require("assert");

const {
  getSelectedData,
  tail,
  generateOutput,
  addHeader
} = require("../src/lib.js");

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
    let actual = getSelectedData("byte", 0, "sampleText", "head");
    let expected = "";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("line", 0, "sample\nText", "head");
    expected = "";
    assert.deepEqual(actual, expected);
  });

  it("should return given range of characters in a string when option is c", function() {
    let actual = getSelectedData("byte", 1, "sampleText", "head");
    let expected = "s";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("byte", 2, "sample\nText", "head");
    expected = "sa";
    assert.deepEqual(actual, expected);
  });

  it("should return given range of lines in a string when option is n", function() {
    let actual = getSelectedData("line", 1, "sample\nText", "head");
    let expected = "sample";
    assert.deepEqual(actual, expected);

    actual = getSelectedData("line", 2, "sample\nText", "head");
    expected = "sample\nText";
    assert.deepEqual(actual, expected);
  });
});

describe("generateOutput", function() {
  it("should return error message for wrong range", function() {
    let actual = generateOutput(["-n", "-10", "something"]);
    let expected = "head: illegal line count -- -10";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-n", "-10x", "something"]);
    expected = "head: illegal line count -- -10x";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-c", "-10", "something"]);
    expected = "head: illegal byte count -- -10";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-c", "-10x", "something"]);
    expected = "head: illegal byte count -- -10x";
    assert.deepEqual(actual, expected);
  });

  it("should return range of characters in file", function() {
    let actual = generateOutput(["-c", "1", "file1"], fs);
    let expected = "s";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-c", "4", "file1"], fs);
    expected = "samp";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-c", "10", "file1"], fs);
    expected = "sample\ntex";
    assert.deepEqual(actual, expected);
  });

  it("should return range of lines in file", function() {
    let actual = generateOutput(["-n", "1", "file1"], fs);
    let expected = "sample";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-n", "4", "file2"], fs);
    expected = "a\nb\nc\nd";
    assert.deepEqual(actual, expected);

    actual = generateOutput(["-n", "10", "file2"], fs);
    expected = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj";
    assert.deepEqual(actual, expected);
  });

  it("should return error message for missing file", function() {
    let actual = generateOutput(["-n", "10", "text"], fs);
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

describe("addHeader", () => {
  it("should return data with header when NoOfFiles more than 1 ", () => {
    let actual = addHeader(2, "file", "something");
    let expected = "==> file <==\nsomething\n";
    assert.deepEqual(actual, expected);
  });
  it("should return without header when NoOfFiles less than or 1", () => {
    let actual = addHeader(1, "text.js", "nothing");
    let expected = "nothing";
    assert.deepEqual(actual, expected);

    actual = addHeader(0, "node.js", "sampleText");
    expected = "sampleText";
    assert.deepEqual(actual, expected);
  });
});
