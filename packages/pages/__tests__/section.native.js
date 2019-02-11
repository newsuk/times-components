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
import "./mocks";
import Section from "../src/section/section";

jest.mock("@times-components/edition-slices", () => ({
  LeadOneAndFourSlice: "LeadOneAndFourSlice",
  LeadOneAndOneSlice: "LeadOneAndOneSlice",
  LeadOneFullWidthSlice: "LeadOneFullWidthSlice",
  LeadTwoNoPicAndTwoSlice: "LeadTwoNoPicAndTwoSlice",
  ListTwoAndSixNoPicSlice: "ListTwoAndSixNoPicSlice",
  SecondaryFourSlice: "SecondaryFourSlice",
  SecondaryOneSlice: "SecondaryOneSlice"
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
        <Section onPress={() => {}} slices={edition.sections[0].slices} />
      ).toJSON()
    ).toMatchSnapshot();
  });
};
