import getBase64CookieValue from "../src/get-base64-cookie-value";

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
