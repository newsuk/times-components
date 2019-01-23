import {
  ArticleSlice,
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  Tile
} from "./types";
import MockArticle from "./mock-article";

function getTile(): Tile {
  const article = new MockArticle().get();
  return {
    article,
    headline: article.headline,
    leadAsset: article.leadAsset
  };
}

function getTiles(count: number): Array<Tile> {
  return new Array(count).fill(0).map(() => getTile());
}

function mockEditionSlice(sliceName: String): ArticleSlice {
  switch (sliceName) {
    case "LeadOneFullWidthSlice": {
      const tiles = getTiles(1);
      return (<LeadOneFullWidthSlice>{
        lead: tiles[0],
        items: tiles
      }) as ArticleSlice;
    }
    case "LeadOneAndOneSlice": {
      const tiles = getTiles(2);
      return (<LeadOneAndOneSlice>{
        lead: tiles[0],
        support: tiles[1],
        items: tiles
      }) as ArticleSlice;
    }
    case "LeadOneAndTwoSlice": {
      const tiles = getTiles(3);
      return (<LeadOneAndTwoSlice>{
        lead: tiles[0],
        support1: tiles[1],
        support2: tiles[2],
        items: tiles
      }) as ArticleSlice;
    }
  }

  return { items: getTiles(3) };
}

export default mockEditionSlice;
