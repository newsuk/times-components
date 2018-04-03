import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ArticleFlag, {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "../article-flag";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ArticleFlag title="articleFlag" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders New flag correctly", () => {
    const tree = renderer.create(<NewArticleFlag />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Updated flag correctly", () => {
    const tree = renderer.create(<UpdatedArticleFlag />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Exclusive flag correctly", () => {
    const tree = renderer.create(<ExclusiveArticleFlag />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Sponsored flag correctly", () => {
    const tree = renderer.create(<SponsoredArticleFlag />).toJSON();
    expect(tree).toMatchSnapshot();
  });
};
