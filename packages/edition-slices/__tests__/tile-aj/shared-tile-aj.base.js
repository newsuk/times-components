import "../mocks-tiles";
import { testPuzzleTile } from "../shared-tile-utils";
import { TileAJ } from "../../src/tiles";

export default () => {
  describe("tile aj", () => {
    it("without breakpoint", () => {
      testPuzzleTile(TileAJ);
    });
  });
};
