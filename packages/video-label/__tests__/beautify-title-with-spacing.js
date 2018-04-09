import beautifyTitle from "../src/beautify-title";

export default () => {
  it("does capitalise every letter", () => {
    expect(beautifyTitle("title")).toMatch(/T\sI\sT\sL\sE/);
  });
};
