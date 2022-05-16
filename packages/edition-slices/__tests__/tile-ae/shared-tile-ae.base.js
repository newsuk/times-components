import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAE } from "../../src/tiles";

export default () => {
  describe("tile ae", () => {
    it("medium", () => {
      testTile(TileAE, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAE, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAE, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileAE);
    });
  });
};
