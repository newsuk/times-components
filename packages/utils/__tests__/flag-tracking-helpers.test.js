import { getIsLiveOrBreakingFlag, getActiveArticleFlag } from '../src/flag-tracking-helpers';

describe('Flag tracking helpers', () => {
  describe('getIsLiveOrBreakingFlag', () => {
    it("getIsLiveOrBreakingFlag object", () => {
      expect(getIsLiveOrBreakingFlag([
				{
					type: "LIVE",
					expiryTime: "2050-04-20T16:15:00.000Z"
				}
			])).toEqual("LIVE");
    });
    
    it("getIsLiveOrBreakingFlag string", () => {
      expect(getIsLiveOrBreakingFlag(["LIVE"])).toEqual("LIVE");
    });
  });
  describe('getActiveArticleFlag', () => {
    it('returns the flag string value if it is active', () => {
      expect(getActiveArticleFlag([{ type: "LIVE", expiryTime: "2050-04-20T16:15:00.000Z"}])).toEqual("LIVE")
    });
    it('returns undefined if the string is not active', () => {
      expect(getActiveArticleFlag([{ type: "LIVE", expiryTime: "2000-01-01T16:15:00.000Z"}])).toBeUndefined();
    });
  })
})