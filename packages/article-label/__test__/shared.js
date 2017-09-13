/* eslint-env jest */

import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from "react-test-renderer";
import ArticleLabel from "../article-label";

module.exports = () => {
  it("renders ArticleLabel", () => {
    const tree = renderer
      .create(<ArticleLabel title="swimming" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
