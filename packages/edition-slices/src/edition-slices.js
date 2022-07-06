import { getDimensions } from "@times-components/utils";
import { tabletWidth } from "@times-components/ts-styleguide";
import {
  CommentLeadAndCartoonSlice,
  DailyRegisterLeadFourSlice,
  LeadersSlice,
  LeadOneAndFourSlice,
  StandardSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryFourSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryOneAndFourSlice,
  SecondaryOneSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  PuzzleSlice
} from "./slices";

const { width } = getDimensions();
const isTablet = width > tabletWidth;
const SecondaryTwoAndTwoMapper = isTablet
  ? SecondaryTwoNoPicAndTwoSlice
  : SecondaryTwoAndTwoSlice;

const sliceMap = {
  CommentLeadAndCartoonSlice,
  DailyUniversalRegister: DailyRegisterLeadFourSlice,
  LeadersSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  Puzzle: PuzzleSlice,
  SecondaryFourSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryOneAndFourSlice,
  SecondaryOneSlice,
  SecondaryTwoAndTwoSlice: SecondaryTwoAndTwoMapper,
  SecondaryTwoNoPicAndTwoSlice,
  StandardSlice,
  TwoPicAndSixNoPicSlice: ListTwoAndSixNoPicSlice
};

export default sliceMap;
