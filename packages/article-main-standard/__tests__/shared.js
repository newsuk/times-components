import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleMainStandard from "../src/article-main-standard";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleMainStandard />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
