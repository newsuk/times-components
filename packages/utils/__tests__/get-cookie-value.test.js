import getCookieValue from "../src/get-cookie-value";

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
