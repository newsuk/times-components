import { colours } from "../";

describe("Styleguide tests", () => {
  it("should have an object of colours", () => {
    expect(typeof colours).toBe("object");
  });
  it("should have an object of section colours", () => {
    expect(typeof colours.sectionColours).toBe("object");
  });
  it("should have an object of functional colours", () => {
    expect(typeof colours.functionalColours).toBe("object");
  });
});
