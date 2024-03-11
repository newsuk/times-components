import getCpnId from "../../src/utils";

describe("utils", () => {
  describe("getCpnId()", () => {
    it("should return undefined when the cookie does not contain a cpn", () => {
      expect(getCpnId()).toBeUndefined();
      expect(getCpnId("key=value")).toBeUndefined();
    });

    it("should return a cpn when the cookie is valid", () => {
      expect(getCpnId("eid=12345")).toEqual("12345");
    });
  });
});
