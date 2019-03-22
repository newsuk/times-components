import React from "react";
import { MockEdition } from "@times-components/fixture-generator";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import Section from "../src/section";
import PuzzleBar from "../src/puzzle-bar";

jest.mock("@times-components/edition-slices", () => ({
  __esModule: true,
  default: {
    LeadOneAndFourSlice: "LeadOneAndFourSlice",
    LeadOneAndOneSlice: "LeadOneAndOneSlice",
    LeadOneAndTwoSlice: "LeadOneAndTwoSlice",
    LeadOneFullWidthSlice: "LeadOneFullWidthSlice",
    LeadTwoNoPicAndTwoSlice: "LeadTwoNoPicAndTwoSlice",
    SecondaryFourSlice: "SecondaryFourSlice",
    SecondaryOneSlice: "SecondaryOneSlice",
    SecondaryTwoNoPicAndTwoSlice: "SecondaryTwoNoPicAndTwoSlice",
    TwoPicAndSixNoPicSlice: "ListTwoAndSixNoPicSlice"
  }
}));

jest.mock("@times-components/icons", () => ({
  IconForwardArrow: "IconForwardArrow"
}));

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  it("section page", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          recentlyOpenedPuzzleCount={1}
          section={edition.sections[0]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with no puzzles", () => {
    expect(
      TestRenderer.create(<PuzzleBar count={0} onPress={() => {}} />).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with one puzzle", () => {
    expect(
      TestRenderer.create(<PuzzleBar count={1} onPress={() => {}} />).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with more than one puzzle", () => {
    expect(
      TestRenderer.create(<PuzzleBar count={3} onPress={() => {}} />).toJSON()
    ).toMatchSnapshot();
  });
};
