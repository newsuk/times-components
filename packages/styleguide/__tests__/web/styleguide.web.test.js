import shared from "../shared";
import { Colours } from "../../styleguide";

describe("Styleguide tests for web", () => {
  it("should have an object of section colours", () => {
    expect(typeof Colours.sectionColours).toBe("object");
  });

  shared();
});
