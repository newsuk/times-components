import { getMaxSizes } from "../../src/utils";

export default () => {
  it("returns the maximum height and width from an array of arrays of sizes", () => {
    const biggestValue = 300;
    const sizes = [[100, biggestValue], [biggestValue, 200], [100, 200]];

    expect(getMaxSizes(sizes)).toEqual({
      height: biggestValue,
      width: biggestValue
    });
  });

  it("returns zero values if the sizes are falsey", () => {
    const defaultZeroValues = { height: 0, width: 0 };

    expect(getMaxSizes()).toEqual(defaultZeroValues);
    expect(getMaxSizes(null)).toEqual(defaultZeroValues);
    expect(getMaxSizes(undefined)).toEqual(defaultZeroValues);
  });
};
