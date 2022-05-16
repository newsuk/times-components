import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileD } from "../../src/tiles";

export default () => {
  describe("tile d", () => {
    it("small", () => {
      testTile(TileD, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileD, editionBreakpoints.medium);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileD);
    });
  });
};
