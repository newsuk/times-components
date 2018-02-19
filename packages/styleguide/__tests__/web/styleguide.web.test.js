import shared from "../shared";
import { sectionColours } from "../../";

describe("Styleguide tests for web", () => {
  it("should have an object of section colours", () => {
    expect(typeof sectionColours).toBe("object");
  });

  shared();
});
