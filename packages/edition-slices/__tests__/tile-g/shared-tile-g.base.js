import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileG } from "../../src/tiles";

export default () => {
  describe("tile g", () => {
    it("small", () => {
      testTile(TileG, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileG, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileG, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileG, editionBreakpoints.huge);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileG);
    });
  });
};
