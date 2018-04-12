import addMissingProtocol from "../add-missing-protocol";

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
});
