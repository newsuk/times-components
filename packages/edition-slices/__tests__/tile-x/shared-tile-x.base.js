import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileX } from "../../src/tiles";

export default () => {
  describe("tile x", () => {
    it("medium", () => {
      testTile(TileX, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileX, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileX, editionBreakpoints.huge);
    });
  });
};
