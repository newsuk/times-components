/* global context */
import {
  acceptedWidths,
  normaliseWidth,
  screenWidth,
  screenWidthInPixels
} from "../src";

describe("screen utilities", () => {
  context("normaliseWidth", () => {
    it("should return the next highest value from the acceptedWidths array", () => {
      const firstAcceptedWidthItem = acceptedWidths[0];
      const width = firstAcceptedWidthItem - 1;
      expect(normaliseWidth(width)).toEqual(firstAcceptedWidthItem);
    });

    it("should return the last highest value from the acceptedWidths array", () => {
      const lastAcceptedWidthItem = acceptedWidths[acceptedWidths.length - 1];
      const width = lastAcceptedWidthItem + 1;
      expect(normaliseWidth(width)).toEqual(lastAcceptedWidthItem);
    });
  });

  context("screenWidth", () => {
    it("should return the device screen width", () => {
      expect(screenWidth()).toMatchSnapshot();
    });

    it("should return the tablet width as screen width minus the needed padding", () => {
      expect(screenWidth(true)).toMatchSnapshot();
    });
  });

  context("screenWidthInPixels", () => {
    it("should return the correct device screen width in pixels", () => {
      expect(screenWidthInPixels()).toMatchSnapshot();
    });
  });
});
