import { Tile } from "./types";
import MockArticle from "./mock-article";

class MockTile {
  tile: Tile;

  constructor() {
    const article = new MockArticle().get();

    this.tile = {
      articleId: "dc4ed2e8-4584-11e9-924d-9729bcd51a7f",
      article,
      headline: "This is tile headline",
      leadAsset: article.leadAsset,
      strapline: "Three Conservative MPs resign"
    };
  }

  get() {
    return this.tile;
  }
}

export default MockTile;
