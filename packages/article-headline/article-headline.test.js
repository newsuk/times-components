/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleHeadline from "./article-headline";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ArticleHeadline title="Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
