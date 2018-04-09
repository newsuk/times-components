import patRegExp from "../src/pat-regexp";

describe("depend pat-regexp tests", () => {
  it("should return nothing if empty", () => {
    expect(patRegExp("")).toEqual("");
  });

  it("should wrap expr with ^expr.*$", () => {
    expect(patRegExp("expr")).toEqual("^expr.*$");
  });

  it("should replace * with .+", () => {
    expect(patRegExp("*/*")).toEqual("^.+/.+.*$");
  });
});
