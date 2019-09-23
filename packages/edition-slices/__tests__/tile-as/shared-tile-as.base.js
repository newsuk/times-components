import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAS } from "../../src/tiles";

export default () => {
  describe("tile as", () => {
    it("medium", () => {
      testTile(TileAS, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAS, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAS, editionBreakpoints.huge);
    });
  });
};
