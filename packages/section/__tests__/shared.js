import React from "react";
import { MockEdition } from "@times-components/fixture-generator";
import { SectionContext } from "@times-components/context";
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
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 0 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with one puzzle", () => {
    expect(
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 1 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with more than one puzzle", () => {
    expect(
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 3 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("Times magazine section", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          section={edition.sections[4]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("Sunday Times magazine section", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="SUNDAY TIMES"
          section={edition.sections[4]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
};
