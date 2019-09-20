import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile, dailyRegisterItem } from "../shared-tile-utils";
import { TileS } from "../../src/tiles";

export default () => {
  describe("tile s", () => {
    it("small", () => {
      testTile(TileS, editionBreakpoints.small, dailyRegisterItem);
    });

    it("medium", () => {
      testTile(TileS, editionBreakpoints.medium, dailyRegisterItem);
    });

    it("wide", () => {
      testTile(TileS, editionBreakpoints.wide, dailyRegisterItem);
    });

    it("huge", () => {
      testTile(TileS, editionBreakpoints.huge, dailyRegisterItem);
    });

    it("no byline", () => {
      const { byline, ...dailyRegisterItemNoByline } = dailyRegisterItem;
      testTile(TileS, undefined, dailyRegisterItemNoByline);
    });
  });
};
