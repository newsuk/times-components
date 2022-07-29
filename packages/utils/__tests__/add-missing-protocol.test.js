import { addMissingProtocol } from "../src/index";

describe("addMissingProtocol should", () => {
  it("add https to the url if it's missing the protocol", () => {
    expect(addMissingProtocol("//thetimes.co.uk")).toEqual(
      "https://thetimes.co.uk"
    );
  });

  it("return the given url if it has a protocol already", () => {
    expect(addMissingProtocol("http://thetimes.co.uk")).toEqual(
      "http://thetimes.co.uk"
    );
  });

  it("return null of no uri is provided", () => {
    expect(addMissingProtocol()).toEqual(null);
  });
});
