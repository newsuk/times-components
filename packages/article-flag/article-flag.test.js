/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleFlag from "./article-flag";

describe("Article Flag", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ArticleFlag />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders New flag correctly", () => {
    const tree = renderer.create(<ArticleFlag title="New" value />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Sponsored flag correctly", () => {
    const tree = renderer
      .create(<ArticleFlag title="Sponsored" value />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Updated flag correctly", () => {
    const tree = renderer
      .create(<ArticleFlag title="Updated" value />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Custom flag with styles correctly", () => {
    const tree = renderer
      .create(<ArticleFlag title="Custom" value style={{ color: "green" }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders Custom flag without styles correctly", () => {
    const tree = renderer.create(<ArticleFlag title="Custom" value />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
