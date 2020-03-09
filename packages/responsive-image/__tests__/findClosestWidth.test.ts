import findClosestWidth from "../src/utils/findClosestWidth";

describe("findClosestWidth", () => {
  it("should return the corrent width", () => {
    const width = 330;
    const expectedWidth = 330;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });

  it("should return the corrent width", () => {
    const width = 650;
    const expectedWidth = 685;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });

  it("should return the corrent width if width is present in the array", () => {
    const width = 1024;
    const expectedWidth = 1024;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });

  it("should return the corrent width if width is 0", () => {
    const width = 0;
    const expectedWidth = 160;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });

  it("should return the corrent width if width is negative number", () => {
    const width = -1024;
    const expectedWidth = 160;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });

  it("should return the corrent width if width is negative number", () => {
    const width = 828;
    const expectedWidth = 750;
    expect(findClosestWidth(width)).toEqual(expectedWidth);
  });
});