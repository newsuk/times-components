import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileH } from "../../src/tiles";

export default () => {
  describe("tile h", () => {
    it("without breakpoint", () => {
      testTile(TileH);
    });
  });
};
