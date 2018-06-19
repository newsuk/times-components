import { androidLetterSpacing, capitalise, ratioTextToFloat } from "../src";

describe("androidLetterSpacing should", () => {
  it("seperate each letter of a word to support letterSpacing and capitalise it", () => {
    expect(androidLetterSpacing("my test")).toEqual(
      "M\u200AY\u200A \u200AT\u200AE\u200AS\u200AT"
    );
  });
});

describe("capitalise should", () => {
  it("capitalise the first letter of a sentence", () => {
    expect(capitalise("test")).toEqual("Test");
  });

  it("keep the capitalised first letter of a sentence", () => {
    expect(capitalise("Test")).toEqual("Test");
  });

  it("only capitalise first letter of sentence and keep the rest", () => {
    expect(capitalise("my test")).toEqual("My test");
  });
});

describe("ratioTextToFloat should", () => {
  it("return 1 if no string is given", () => {
    expect(ratioTextToFloat()).toEqual(1);
  });

  it("return 1 if an empty string is given", () => {
    expect(ratioTextToFloat("")).toEqual(1);
  });

  it("return 1 if an invalid string is given is given", () => {
    expect(ratioTextToFloat("a:b")).toEqual(1);
  });

  it("return 1.5 if 3:2 is given", () => {
    expect(ratioTextToFloat("3:2")).toEqual(1.5);
  });
});
