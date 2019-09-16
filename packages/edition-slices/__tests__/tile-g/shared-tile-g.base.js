import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
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
  });
};
