import {
  ArticleSlice,
  CommentLeadAndCartoonSlice,
  LeadOneAndFourSlice,
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  LeadTwoNoPicAndTwoSlice,
  LeadersSlice,
  SecondaryOneSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  TwoPicAndSixNoPicSlice,
  Tile,
  SecondaryOneAndFourSlice,
  Puzzle
} from "./types";
import MockArticle from "./mock-article";
import MockPuzzle from "./mock-puzzle";

interface LeadOneAndFourSliceWithName extends LeadOneAndFourSlice {
  name: string;
}

interface LeadOneFullWidthSliceWithName extends LeadOneFullWidthSlice {
  name: string;
}

interface LeadOneAndOneSliceWithName extends LeadOneAndOneSlice {
  name: string;
}

interface LeadOneAndTwoSliceWithName extends LeadOneAndTwoSlice {
  name: string;
}

interface LeadTwoNoPicAndTwoSliceWithName extends LeadTwoNoPicAndTwoSlice {
  name: string;
}

interface SecondaryOneSliceWithName extends SecondaryOneSlice {
  name: string;
}

interface SecondaryOneAndColumnistSliceWithName
  extends SecondaryOneAndColumnistSlice {
  name: string;
}

interface SecondaryOneAndFourSliceWithName extends SecondaryOneAndFourSlice {
  name: string;
}

interface SecondaryFourSliceWithName extends SecondaryFourSlice {
  name: string;
}

interface SecondaryTwoAndTwoSliceWithName extends SecondaryTwoAndTwoSlice {
  name: string;
}

interface CommentLeadAndCartoonSliceWithName
  extends CommentLeadAndCartoonSlice {
  name: string;
}

interface LeadersSliceWithName extends LeadersSlice {
  name: string;
}

interface SecondaryTwoNoPicAndTwoSliceWithName
  extends SecondaryTwoNoPicAndTwoSlice {
  name: string;
}

interface TwoPicAndSixNoPicSliceWithName extends TwoPicAndSixNoPicSlice {
  name: string;
}

function getTile(): Tile {
  const article = new MockArticle().get();
  return {
    article,
    headline: article.headline,
    leadAsset: article.leadAsset,
    strapline: article.standfirst
  };
}

function getTiles(count: number): Array<Tile> {
  return new Array(count).fill(0).map(() => getTile());
}

function mockLeadOneAndFourSlice(): LeadOneAndFourSliceWithName {
  const tiles = getTiles(5);
  return <LeadOneAndFourSliceWithName>{
    name: "LeadOneAndFourSlice",
    lead: tiles[0],
    items: tiles,
    support1: tiles[1],
    support2: tiles[2],
    support3: tiles[3],
    support4: tiles[4]
  };
}

function mockLeadOneFullWidthSlice(): LeadOneFullWidthSliceWithName {
  const tiles = getTiles(1);
  return <LeadOneFullWidthSliceWithName>{
    name: "LeadOneFullWidthSlice",
    lead: tiles[0],
    items: tiles
  };
}

function mockLeadOneAndOneSlice(): LeadOneAndOneSliceWithName {
  const tiles = getTiles(2);
  return <LeadOneAndOneSliceWithName>{
    name: "LeadOneAndOneSlice",
    lead: tiles[0],
    support: tiles[1],
    items: tiles
  };
}

function mockLeadOneAndTwoSlice(): LeadOneAndTwoSliceWithName {
  const tiles = getTiles(3);
  return <LeadOneAndTwoSliceWithName>{
    name: "LeadOneAndTwoSlice",
    lead: tiles[0],
    support1: tiles[1],
    support2: tiles[2],
    items: tiles
  };
}

function mockLeadTwoNoPicAndTwoSlice(): LeadTwoNoPicAndTwoSliceWithName {
  const tiles = getTiles(4);
  return <LeadTwoNoPicAndTwoSliceWithName>{
    name: "LeadTwoNoPicAndTwoSlice",
    lead1: tiles[0],
    lead2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles
  };
}

function mockSecondaryOneSlice(): SecondaryOneSliceWithName {
  const tiles = getTiles(1);
  return <SecondaryOneSliceWithName>{
    name: "SecondaryOneSlice",
    secondary: tiles[0],
    items: tiles
  };
}

function mockSecondaryOneAndColumnistSlice(): SecondaryOneAndColumnistSliceWithName {
  const tiles = getTiles(2);
  return <SecondaryOneAndColumnistSliceWithName>{
    name: "SecondaryOneAndColumnistSlice",
    secondary: tiles[0],
    columnist: tiles[1],
    items: tiles
  };
}

function mockSecondaryOneAndFourSlice(): SecondaryOneAndFourSliceWithName {
  const tiles = getTiles(5);
  return <SecondaryOneAndFourSliceWithName>{
    name: "SecondaryOneAndFourSlice",
    secondary: tiles[0],
    support1: tiles[1],
    support2: tiles[2],
    support3: tiles[3],
    support4: tiles[4],
    items: tiles
  };
}

function mockSecondaryFourSlice(): SecondaryFourSliceWithName {
  const tiles = getTiles(4);
  return <SecondaryFourSliceWithName>{
    name: "SecondaryFourSlice",
    secondary1: tiles[0],
    secondary2: tiles[1],
    secondary3: tiles[2],
    secondary4: tiles[3],
    items: tiles
  };
}

function mockSecondaryTwoNoPicAndTwoSlice(): SecondaryTwoNoPicAndTwoSliceWithName {
  const tiles = getTiles(4);
  return <SecondaryTwoNoPicAndTwoSliceWithName>{
    name: "SecondaryTwoNoPicAndTwoSlice",
    secondary1: tiles[0],
    secondary2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles
  };
}

function mockSecondaryTwoAndTwoSlice(): SecondaryTwoAndTwoSliceWithName {
  const tiles = getTiles(4);
  return <SecondaryTwoAndTwoSliceWithName>{
    name: "SecondaryTwoAndTwoSlice",
    secondary1: tiles[0],
    secondary2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles
  };
}

function mockListTwoAndSixNoPicSlice(): TwoPicAndSixNoPicSliceWithName {
  const tiles = getTiles(8);
  return <TwoPicAndSixNoPicSliceWithName>{
    name: "TwoPicAndSixNoPicSlice",
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

function mockLeadersSlice(): LeadersSliceWithName {
  const tiles = getTiles(3);
  return <LeadersSliceWithName>{
    name: "LeadersSlice",
    leader1: tiles[0],
    leader2: tiles[1],
    leader3: tiles[2],
    items: tiles
  };
}

function mockCommentLeadAndCartoonSlice(): CommentLeadAndCartoonSliceWithName {
  const tiles = getTiles(2);
  const leadTile = {
    ...tiles[0],
    article: { ...tiles[0].article, section: "opinion" }
  };
  return <CommentLeadAndCartoonSliceWithName>{
    name: "CommentLeadAndCartoonSlice",
    lead: leadTile,
    cartoon: tiles[1],
    items: tiles
  };
}

function mockArticleSlice(count: number): ArticleSlice {
  return { items: getTiles(count) };
}

function mockPuzzleSlice(): Puzzle {
  const { title, url, image } = new MockPuzzle().get();
  return <Puzzle>{
    title,
    url,
    image
  };
}

export default mockArticleSlice;
export {
  mockCommentLeadAndCartoonSlice,
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneAndTwoSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryOneSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryOneAndFourSlice,
  mockSecondaryFourSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockPuzzleSlice
};
