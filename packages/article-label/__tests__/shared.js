import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleLabel from "../src/article-label";

module.exports = () => {
  it("renders ArticleLabel", () => {
    const testInstance = TestRenderer.create(
      <ArticleLabel color="#008347" title="swimming" />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
