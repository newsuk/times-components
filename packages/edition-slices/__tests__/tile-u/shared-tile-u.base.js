import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileU } from "../../src/tiles";

export default () => {
  describe("tile u", () => {
    it("without breakpoint", () => {
      testTile(TileU);
    });
  });
};
