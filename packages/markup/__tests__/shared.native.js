import React from "react";
import { View } from "react-native";
import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import { renderTrees } from "../src/markup";
import shared from "./shared.base";

const multiParagraphWithAds = require("../fixtures/multi-paragraph-with-ads.json");

jest.mock("@times-components/ad", () => "Ad");
jest.mock("@times-components/pull-quote", () => "PullQuote");

export default () => {
  addSerializers(expect, minimalNative);

  shared(TestRenderer.create);

  it("renders multiple paragraphs with ads", () => {
    const testInstance = TestRenderer.create(
      <View>{renderTrees(multiParagraphWithAds)}</View>
    );

    expect(testInstance).toMatchSnapshot(
      "14. renders multiple paragraphs with ads"
    );
  });
};
