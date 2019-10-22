import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAA } from "../../src/tiles";

export default () => {
  describe("tile aа", () => {
    it("without breakpoint", () => {
      testTile(TileAA);
    });
  });
};
