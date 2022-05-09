import {
  getActiveArticleFlags,
  getIsLiveOrBreakingFlag
} from "../../src/data-helper";

describe("Data helper", () => {
  const active = "2050-03-13T13:00:00.000Z";
  const expired = "2000-03-13T13:00:00.000Z";
  describe("getActiveArticleFlags", () => {
    it("Returns the lower case value of a flag is a flag is active", () => {
      const flags = [
        {
          type: "BREAKING",
          expiryTime: active
        }
      ];
      expect(getActiveArticleFlags(flags)).toEqual("breaking");
    });
    it("Returns undefined if there are no flags", () => {
      const flags = [];
      expect(getActiveArticleFlags(flags)).toEqual(undefined);
    });
    it("Returns undefined if the flag has expired", () => {
      const flags = [
        {
          type: "BREAKING",
          expiryTime: expired
        }
      ];
      expect(getActiveArticleFlags(flags)).toEqual(undefined);
    });
  });
  describe("getIsLiveOrBreakingFlag", () => {
    it("Returns LIVE if the flag is live and active", () => {
      const flags = [
        {
          type: "LIVE",
          expiryTime: active
        }
      ];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual("LIVE");
    });
    it("Returns LIVE if the flag is live and expired", () => {
      const flags = [
        {
          type: "LIVE",
          expiryTime: expired
        }
      ];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual("LIVE");
    });
    it("Returns BREAKING if the flag is breaking and active", () => {
      const flags = [
        {
          type: "BREAKING",
          expiryTime: active
        }
      ];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual("BREAKING");
    });
    it("Returns BREAKING if the flag is breaking and expired", () => {
      const flags = [
        {
          type: "BREAKING",
          expiryTime: expired
        }
      ];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual("BREAKING");
    });
    it("Returns undefined if there are no flags", () => {
      const flags = [];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual(undefined);
    });
    it("Returns undefined if the flag is not live or breaking", () => {
      const flags = [
        {
          type: "UPDATED",
          expiryTime: active
        }
      ];
      expect(getIsLiveOrBreakingFlag(flags)).toEqual(undefined);
    });
  });
});
