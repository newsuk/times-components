import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAL } from "../../src/tiles";

export default () => {
  describe("tile al", () => {
    it("without breakpoint", () => {
      testTile(TileAL);
    });
  });
};
