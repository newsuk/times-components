import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileF } from "../../src/tiles";

export default () => {
  describe("tile f", () => {
    it("without breakpoint", () => {
      testTile(TileF);
    });
  });
};
