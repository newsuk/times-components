import { appendToImageURL } from "../src/index.web";

describe("appendToImageURL", () => {
  it("should return correct url for an empty key", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com";
    expect(appendToImageURL(url, "", "value")).toEqual(expectedUrl);
  });

  it("should return correct url for an empty value", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com";
    expect(appendToImageURL(url, "myKey", "")).toEqual(expectedUrl);
  });

  it("should return correct url when key already present in supplied url as first param", () => {
    const url = "https://myurl.com?myKey=originalValue";
    const expectedUrl = "https://myurl.com?myKey=originalValue";
    expect(appendToImageURL(url, "myKey", "newValue")).toEqual(expectedUrl);
  });

  it("should return correct url when key already present in supplied url as second param", () => {
    const url = "https://myurl.com?otherKey=otherValue&myKey=originalValue";
    const expectedUrl =
      "https://myurl.com?otherKey=otherValue&myKey=originalValue";
    expect(appendToImageURL(url, "myKey", "newValue")).toEqual(expectedUrl);
  });

  it("should return correct url when supplied url has a search", () => {
    const url = "https://myurl.com?crop=1000";
    const expectedUrl = "https://myurl.com?crop=1000&myKey=myValue";
    expect(appendToImageURL(url, "myKey", "myValue")).toEqual(expectedUrl);
  });

  it("should return correct url when supplied url has no search", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com?myKey=myValue";
    expect(appendToImageURL(url, "myKey", "myValue")).toEqual(expectedUrl);
  });
});
