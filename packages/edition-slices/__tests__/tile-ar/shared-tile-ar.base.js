import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAR } from "../../src/tiles";

export default () => {
  describe("tile ar", () => {
    it("without breakpoint", () => {
      testTile(TileAR);
    });
  });
};
