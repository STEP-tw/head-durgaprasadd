const assert = require("assert");

const { getSelectedData, tail, head } = require("../src/lib.js");

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

const readFile = function(file) {
  return file;
};
const existsFile = () => true;
const notExistsFile = () => false;

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
    assert.deepEqual(
      head(["-c", "1", "text"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "t\n"
    );
    assert.deepEqual(
      head(["-c", "4", "text"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "text\n"
    );
    assert.deepEqual(
      head(["-c", "10", "text"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "text\n"
    );
  });
  it("should return range of lines in file", function() {
    assert.deepEqual(
      head(["-n", "1", "text"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "text\n"
    );
    assert.deepEqual(
      head(["-n", "4", "nothing"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "nothing\n"
    );
    assert.deepEqual(
      head(["-n", "10", "sample"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "sample\n"
    );
  });
  it("should return error message for missing file", function() {
    assert.deepEqual(
      head(["-n", "10", "text"], {
        readFileSync: readFile,
        existsSync: notExistsFile
      }),
      "head: text: No such file or directory"
    );
  });
});
describe("tail", () => {
  it("should return nothing for range 0", () => {
    assert.deepEqual(
      tail(["-n0", "file"], { readFileSync: readFile, existsSync: existsFile }),
      ""
    );
  });
  it("should return error for invalid values of -n and -c", () => {
    assert.deepEqual(
      tail(["-n0x", "file"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "tail: illegal offset -- 0x"
    );
    assert.deepEqual(
      tail(["-c0x", "file"], {
        readFileSync: readFile,
        existsSync: existsFile
      }),
      "tail: illegal offset -- 0x"
    );
  });
});
