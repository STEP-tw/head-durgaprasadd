const assert = require("assert");

const {
  errorMessageForIllegalCount,
  errorMessageForMissingFiles
} = require("../src/errorHandling.js");

describe("errorMessageForIllegalCount", () => {
  describe("for head", () => {
    it("should return error message for illegal line count", () => {
      let actual = errorMessageForIllegalCount("head", "line", "-10");
      let expected = "head: illegal line count -- -10";
      assert.deepEqual(actual, expected);

      actual = errorMessageForIllegalCount("head", "line", "2x");
      expected = "head: illegal line count -- 2x";
      assert.deepEqual(actual, expected);
    });

    it("should return error message for illegal byte count ", () => {
      let actual = errorMessageForIllegalCount("head", "byte", "-3");
      let expected = "head: illegal byte count -- -3";
      assert.deepEqual(actual, expected);

      actual = errorMessageForIllegalCount("head", "byte", "3e");
      expected = "head: illegal byte count -- 3e";
      assert.deepEqual(actual, expected);
    });
  });

  describe("for tail", () => {
    it("should return error message for illegal line and byte count", () => {
      let actual = errorMessageForIllegalCount("tail", "line", "-3");
      let expected = "tail: illegal offset -- -3";
      assert.deepEqual(actual, expected);

      actual = errorMessageForIllegalCount("tail", "byte", "3s");
      expected = "tail: illegal offset -- 3s";
      assert.deepEqual(actual, expected);
    });
  });
});

describe("errorMessageForMissingFiles", () => {
  it("should return erroror message for missing files for both head and tail", () => {
    let actual = errorMessageForMissingFiles("head", "something");
    let expected = "head: something: No such file or directory";
    assert.deepEqual(actual, expected);

    actual = errorMessageForMissingFiles("tail", "nothing");
    expected = "tail: nothing: No such file or directory";
    assert.deepEqual(actual, expected);
  });
});
