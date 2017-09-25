/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorHead from "../author-head";

const data = require("../fixtures/profile.json");

const extra = { onTwitterLinkPress: () => {} };

it("renders", () => {
  const tree = renderer.create(<AuthorHead {...extra} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with data", () => {
  const tree = renderer.create(<AuthorHead {...data} {...extra} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without profile picture", () => {
  const tree = renderer
    .create(<AuthorHead {...data} {...extra} uri={""} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
