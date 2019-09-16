import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAE } from "../../src/tiles";

export default () => {
  describe("tile ae", () => {
    it("without breakpoint", () => {
      testTile(TileAE);
    });
  });
};
