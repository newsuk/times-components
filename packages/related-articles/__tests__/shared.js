import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import RelatedArticles from "../related-articles";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<RelatedArticles />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
