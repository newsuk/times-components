import { gqlRgbaToStyle } from "../src/index";

const colour = {
  rgba: {
    alpha: 1,
    blue: 244,
    green: 223,
    red: 66
  }
};

describe("getRgbaToStyle should", () => {
  it("convert GQL Colour type structure to a css rgba", () => {
    expect(gqlRgbaToStyle(colour)).toEqual("rgba(66, 223, 244, 1)");
  });
  it("return null if object is incomplete", () => {
    const incompleteColour = delete colour.rgba;
    expect(gqlRgbaToStyle(incompleteColour)).toEqual(null);
  });
});
