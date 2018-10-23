import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleError from "../src/article-error";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleError refetch={() => null} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
