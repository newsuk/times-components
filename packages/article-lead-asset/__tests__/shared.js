import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleLeadAsset from "../src/article-lead-asset";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleLeadAsset />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
