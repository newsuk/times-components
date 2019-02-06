import {
  ArticleSlice,
  LeadOneAndFourSlice,
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoNoPicAndTwoSlice,
  TwoPicAndSixNoPicSlice,
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

function mockLeadOneAndFourSlice(): LeadOneAndFourSlice {
  const tiles = getTiles(5);
  return <LeadOneAndFourSlice>{
    lead: tiles[0],
    items: tiles,
    support1: tiles[1],
    support2: tiles[2],
    support3: tiles[3],
    support4: tiles[4]
  };
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

function mockSecondaryFourSlice(): SecondaryFourSlice {
  const tiles = getTiles(4);
  return <SecondaryFourSlice>{
    secondary1: tiles[0],
    secondary2: tiles[1],
    secondary3: tiles[2],
    secondary4: tiles[3],
    items: tiles
  };
}

function mockSecondaryTwoNoPicAndTwoSlice(): SecondaryTwoNoPicAndTwoSlice {
  const tiles = getTiles(4);
  return <SecondaryTwoNoPicAndTwoSlice>{
    secondary1: tiles[0],
    secondary2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles
  };
}

function mockList2AndSixNoPicSlice(): TwoPicAndSixNoPicSlice {
  const tiles = getTiles(8);
  return <TwoPicAndSixNoPicSlice>{
    lead1: tiles[0],
    lead2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    support3: tiles[4],
    support4: tiles[5],
    support5: tiles[6],
    support6: tiles[7],
    items: tiles
  };
}

function mockArticleSlice(count: number): ArticleSlice {
  return { items: getTiles(count) };
}

export default mockArticleSlice;
export {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneAndTwoSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockList2AndSixNoPicSlice
};
