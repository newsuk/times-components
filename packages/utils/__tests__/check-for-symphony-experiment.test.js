import checkForSymphonyExperiment from "../src/check-for-symphony-experiment";

describe("checkForSymphonyExperiment", () => {
  it("returns true if the Symphony experiment is active", () => {
    const base64Value = btoa(
      JSON.stringify({ "free-access-symphony": ["ARTICLE_ACCESS"] })
    );
    document.cookie = `nuk_zephr_decisions=${base64Value}`;
    expect(checkForSymphonyExperiment()).toBe(true);
  });

  it("returns false if the Symphony experiment is not active", () => {
    const base64Value = btoa(JSON.stringify({ "free-access-symphony": [] }));
    document.cookie = `nuk_zephr_decisions=${base64Value}`;
    expect(checkForSymphonyExperiment()).toBe(false);
  });

  it("returns false if the cookie is not found", () => {
    document.cookie = "nuk_zephr_decisions=";
    expect(checkForSymphonyExperiment()).toBe(false);
  });
});
