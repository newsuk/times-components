import sectionColours from "../";

describe("Styleguide tests", () => {
  it("should have an object of section colours", () => {
    expect(typeof sectionColours).toBe("object");
  });
});
