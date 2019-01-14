import { gqlRgbaToHex } from "../src";

const colour = {
  rgba: {
    alpha: 1,
    blue: 244,
    green: 223,
    red: 66
  }
};

describe("gqlRgbaToHex should", () => {
  it("return the correct Hex value from a GraphQL Colour type using rgba", () => {
    expect(gqlRgbaToHex(colour)).toEqual("#42DFF4");
  });
  it("return the correct Hex value for low number rgba values", () => {
    const lowNumberColour = {
      rgba: {
        alpha: 1,
        blue: 7,
        green: 11,
        red: 2
      }
    };
    expect(gqlRgbaToHex(lowNumberColour)).toEqual("#020B07");
  });
  it("return null for an invalid object", () => {
    const invalidColour = delete colour.rgba;
    expect(gqlRgbaToHex(invalidColour)).toEqual(null);
  });
});
