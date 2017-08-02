/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleMeta from "../article-meta";

const props = {
  date: "2017-07-01T14:32:00.000Z",
  publication: "The Sunday Times"
};

it("renders an article-meta component", () => {
  const tree = renderer.create(<ArticleMeta />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an article-meta component with content", () => {
  const tree = renderer.create(<ArticleMeta {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an article-meta component with red font color", () => {
  const styleProps = {
    ...props,
    style: {
      color: "red"
    }
  };
  const tree = renderer.create(<ArticleMeta {...styleProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
