import { getMaxHeight } from "../generate-config";

describe("Generate Config test", () => {
  it("getMaxHeight is 0 is no size is sent", () => {
    const result = getMaxHeight(null);
    expect(result).toEqual(0);
  });

  it("getMaxHeight should return the maximum height from an array of arrays of sizes", () => {
    const sizes = [[300, 250], [320, 50], [320, 48]];
    const result = getMaxHeight(sizes);
    expect(result).toEqual(250);
  });
});
