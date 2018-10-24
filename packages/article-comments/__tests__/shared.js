import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleComments from "../src/article-comments";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(<ArticleComments />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
