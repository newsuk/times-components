import {
  acceptedWidths,
  normaliseWidthForAssetRequestCache,
  screenWidth
} from "../src/index";

describe("screen utilities", () => {
  describe("normaliseWidthForAssetRequestCache", () => {
    it("should return the next highest value from the acceptedWidths array", () => {
      const firstAcceptedWidthItem = acceptedWidths[0];
      const width = firstAcceptedWidthItem - 1;
      expect(normaliseWidthForAssetRequestCache(width)).toEqual(
        firstAcceptedWidthItem
      );
    });

    it("should return the last highest value from the acceptedWidths array", () => {
      const lastAcceptedWidthItem = acceptedWidths[acceptedWidths.length - 1];
      const width = lastAcceptedWidthItem + 1;
      expect(normaliseWidthForAssetRequestCache(width)).toEqual(
        lastAcceptedWidthItem
      );
    });
  });

  describe("screenWidth", () => {
    it("should return the device screen width", () => {
      expect(screenWidth()).toMatchSnapshot();
    });
  });
});
