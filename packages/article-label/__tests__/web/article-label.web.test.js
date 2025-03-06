import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleLabel from "../../src/article-label";

describe("Article Label test on web", () => {
  it("renders ArticleLabel", () => {
    const testInstance = TestRenderer.create(
      <ArticleLabel color="#008347" title="swimming" />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
  it("renders ArticleLabel with GraphQL Colour type", () => {
    const color = {
      rgba: {
        alpha: 1,
        blue: 71,
        green: 131,
        red: 0
      }
    };
    const testInstance = TestRenderer.create(
      <ArticleLabel color={color} title="swimming" />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
});
