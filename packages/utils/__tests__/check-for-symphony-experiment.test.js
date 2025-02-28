import getCookieValue from "../src/get-cookie-value";
import getBase64CookieValue from "../src/get-base64-cookie-value";
import checkForSymphonyExperiment from "../src/check-for-symphony-experiment";

describe("getCookieValue", () => {
  beforeEach(() => {
    document.cookie = "testCookie=testValue";
  });

  it("returns the value of the specified cookie", () => {
    expect(getCookieValue("testCookie")).toBe("testValue");
  });

  it("returns null if the cookie is not found", () => {
    expect(getCookieValue("nonExistentCookie")).toBe(null);
  });
});

describe("getBase64CookieValue", () => {
  beforeEach(() => {
    const base64Value = btoa(JSON.stringify({ key: "value" }));
    document.cookie = `base64Cookie=${base64Value}`;
  });

  it("returns the parsed value of the base64 encoded cookie", () => {
    expect(getBase64CookieValue("base64Cookie")).toEqual({ key: "value" });
  });

  it("returns undefined if the cookie is not found", () => {
    expect(getBase64CookieValue("nonExistentCookie")).toBe(undefined);
  });

  it("returns undefined if the cookie value is not valid base64", () => {
    document.cookie = "invalidBase64Cookie=invalidValue";
    expect(getBase64CookieValue("invalidBase64Cookie")).toBe(undefined);
  });
});

describe("checkForSymphonyExperiment", () => {
  it("returns true if the Symphony experiment is active", () => {
    const base64Value = btoa(
      JSON.stringify({ "project-symphony": ["ARTICLE_ACCESS"] })
    );
    document.cookie = `nuk_zephr_decisions=${base64Value}`;
    expect(checkForSymphonyExperiment()).toBe(true);
  });

  it("returns false if the Symphony experiment is not active", () => {
    const base64Value = btoa(JSON.stringify({ "project-symphony": [] }));
    document.cookie = `nuk_zephr_decisions=${base64Value}`;
    expect(checkForSymphonyExperiment()).toBe(false);
  });

  it("returns false if the cookie is not found", () => {
    document.cookie = "nuk_zephr_decisions=";
    expect(checkForSymphonyExperiment()).toBe(false);
  });
});
