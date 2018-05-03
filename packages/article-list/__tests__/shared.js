import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorProfileListContent from "../src/article-list";

export default () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AuthorProfileListContent />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
