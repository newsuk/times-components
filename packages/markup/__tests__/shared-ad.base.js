import React from "react";
import { View } from "react-native";
import { renderTrees } from "../src/markup";

const multiParagraphWithAds = require("../fixtures/multi-paragraph-with-ads.json");

export default renderComponent => {
  it("multiple paragraphs with ads", () => {
    const testInstance = renderComponent(
      <View>{renderTrees(multiParagraphWithAds)}</View>
    );

    expect(testInstance).toMatchSnapshot();
  });
};
