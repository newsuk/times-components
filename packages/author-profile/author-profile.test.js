/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorProfile from "./author-profile";

it("renders correctly", () => {
  const tree = renderer.create(<AuthorProfile />).toJSON();

  expect(tree).toMatchSnapshot();
});
