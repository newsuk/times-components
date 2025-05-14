import isExcludedPage from "../src/excluded-paths";

describe("isExcludedPage", () => {
  it("returns true for an excluded path", () => {
    expect(isExcludedPage("/obituaries/...")).toBe(true);
  });

  it("returns false for a non-excluded path", () => {
    expect(isExcludedPage("/news/today")).toBe(false);
  });

  it("returns false for null input", () => {
    expect(isExcludedPage(null)).toBe(false);
  });

  it("returns false for undefined input", () => {
    expect(isExcludedPage(undefined)).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isExcludedPage("")).toBe(false);
  });
});
