import { spacing } from "../styleguide";

export default () => {
  it("should multiple spacing values", () => {
    expect(spacing(10)).toBe(50);
  });
};