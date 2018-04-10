import { spacing } from "../styleguide";

export default () => {
  it("should multiply spacing values", () => {
    expect(spacing(10)).toBe(50);
  });
};
