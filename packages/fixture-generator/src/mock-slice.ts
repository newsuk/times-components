import {
  ArticleSlice,
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  SecondaryOneSlice,
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

function mockLeadOneFullWidthSlice(): LeadOneFullWidthSlice {
  const tiles = getTiles(1);
  return <LeadOneFullWidthSlice>{
    lead: tiles[0],
    items: tiles
  };
}

function mockLeadOneAndOneSlice(): LeadOneAndOneSlice {
  const tiles = getTiles(2);
  return <LeadOneAndOneSlice>{
    lead: tiles[0],
    support: tiles[1],
    items: tiles
  };
}

function mockLeadOneAndTwoSlice(): LeadOneAndTwoSlice {
  const tiles = getTiles(3);
  return <LeadOneAndTwoSlice>{
    lead: tiles[0],
    support1: tiles[1],
    support2: tiles[2],
    items: tiles
  };
}

function mockSecondaryOneSlice(): SecondaryOneSlice {
  const tiles = getTiles(1);
  return <SecondaryOneSlice>{
    secondary: tiles[0],
    items: tiles
  };
}

function mockArticleSlice(count: number): ArticleSlice {
  return { items: getTiles(count) };
}

export default mockArticleSlice;
export {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneAndTwoSlice,
  mockSecondaryOneSlice
};
