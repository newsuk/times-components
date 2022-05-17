import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAF } from "../../src/tiles";

export default () => {
  describe("tile af", () => {
    it("wide", () => {
      testTile(TileAF, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAF, editionBreakpoints.huge);
    });

    it("without breakpoint should be like wide", () => {
      testTile(TileAF);
    });
  });
};
