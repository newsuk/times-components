import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileI } from "../../src/tiles";

export default () => {
  describe("tile i", () => {
    it("without breakpoint", () => {
      testTile(TileI);
    });
  });
};
