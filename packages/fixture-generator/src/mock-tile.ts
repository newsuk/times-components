import { Tile } from "./types";
import MockArticle from "./mock-article";

class MockTile {
  tile: Tile;

  constructor() {
    const article = new MockArticle().get();

    this.tile = {
      article,
      headline: article.headline,
      leadAsset: article.leadAsset,
      strapline:
        "The resignation of three Conservative MPs has shown up the divisions in their party that mirror those in Labour. A greater realignment may be needed"
    };
  }

  get() {
    return this.tile;
  }
}

export default MockTile;
