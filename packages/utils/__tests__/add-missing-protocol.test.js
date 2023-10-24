import { BASE_DOMAIN } from "../src/constants";
import { addMissingProtocol } from "../src/index";

describe("addMissingProtocol should", () => {
  it("add https to the url if it's missing the protocol", () => {
    expect(addMissingProtocol(`//${BASE_DOMAIN}`)).toEqual(
      `https://${BASE_DOMAIN}`
    );
  });

  it("return the given url if it has a protocol already", () => {
    expect(addMissingProtocol(`http://${BASE_DOMAIN}`)).toEqual(
      `http://${BASE_DOMAIN}`
    );
  });

  it("return null of no uri is provided", () => {
    expect(addMissingProtocol()).toEqual(null);
  });
});
