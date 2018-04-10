import shared from "../shared";
import { colours, fonts, spacing } from "../../styleguide";

describe("Styleguide tests for web", () => {
  it("should have an object of section colours", () => {
    expect(typeof colours.section).toBe("object");
  });

  it("should have an object of functional colours", () => {
    expect(typeof colours.functional).toBe("object");
  });

  it("should have an object of font references", () => {
    expect(typeof fonts).toBe("object");
  });

  it("should multiply spacing values and add px property", () => {
    expect(spacing(10)).toBe("50px");
  });

  shared();
});
