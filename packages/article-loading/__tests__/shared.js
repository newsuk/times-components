import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleLoading from "../src/article-loading";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleLoading />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
