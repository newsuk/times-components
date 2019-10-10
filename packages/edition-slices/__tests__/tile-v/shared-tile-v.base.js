import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileV } from "../../src/tiles";

export default () => {
  describe("tile v", () => {
    it("without breakpoint", () => {
      testTile(TileV);
    });
  });
};
