import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileJ } from "../../src/tiles";

export default () => {
  describe("tile j", () => {
    it("without breakpoint", () => {
      testTile(TileJ);
    });
  });
};
