import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleSlice from "../src/article-slice";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleSlice />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
