import shared from "../shared";
import { colours } from "../../styleguide";

describe("Styleguide tests for web", () => {
  it("should have an object of section colours", () => {
    expect(typeof colours.sectionColours).toBe("object");
  });

  shared();
});
