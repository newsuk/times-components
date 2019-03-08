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
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          section={edition.sections[0]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
};
