import getImageUrl from "../../src/utils/get-image-url";

describe("getImageUrl", () => {
  it("should return correct url for an empty key", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com";
    expect(getImageUrl(url, "", "value")).toEqual(expectedUrl);
  });

  it("should return correct url for an empty value", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com";
    expect(getImageUrl(url, "myKey", "")).toEqual(expectedUrl);
  });

  it("should return correct url when key already present in supplied url as first param", () => {
    const url = "https://myurl.com?myKey=originalValue";
    const expectedUrl = "https://myurl.com?myKey=originalValue";
    expect(getImageUrl(url, "myKey", "newValue")).toEqual(expectedUrl);
  });

  it("should return correct url when key already present in supplied url as second param", () => {
    const url = "https://myurl.com?otherKey=otherValue&myKey=originalValue";
    const expectedUrl =
      "https://myurl.com?otherKey=otherValue&myKey=originalValue";
    expect(getImageUrl(url, "myKey", "newValue")).toEqual(expectedUrl);
  });

  it("should return correct url when supplied url has a search", () => {
    const url = "https://myurl.com?crop=1000";
    const expectedUrl = "https://myurl.com?crop=1000&myKey=myValue";
    expect(getImageUrl(url, "myKey", "myValue")).toEqual(expectedUrl);
  });

  it("should return correct url when supplied url has no search", () => {
    const url = "https://myurl.com";
    const expectedUrl = "https://myurl.com?myKey=myValue";
    expect(getImageUrl(url, "myKey", "myValue")).toEqual(expectedUrl);
  });

  it("real url", () => {
    const url =
      "https://nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image/d25bfcbabb483488861e9b35d64be66224fd4db1.jpg?crop=1000%2C563%2C0%2C220";
    const expectedUrl =
      "https://nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image/d25bfcbabb483488861e9b35d64be66224fd4db1.jpg?crop=1000%2C563%2C0%2C220&myKey=myValue";
    expect(getImageUrl(url, "myKey", "myValue")).toEqual(expectedUrl);
  });
});
