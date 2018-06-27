import sizes from "../src/utils/sizes";

export default () => {
  it("should contain a config for header ads", () => {
    expect(sizes).toHaveProperty("header");
  });

  it("should contain a config for intervention ads", () => {
    expect(sizes).toHaveProperty("intervention");
  });

  it("should contain a config for pixel ads", () => {
    expect(sizes).toHaveProperty("pixel");
  });
};
