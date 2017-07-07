/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Card from "./card";

it("renders correctly", () => {
  const tree = renderer.create(<Card />).toJSON();

  expect(tree).toBeTruthy();
});

it("renders a snapshot", () => {
  const tree = renderer.create(<Card />).toJSON();

  expect(tree).toMatchSnapshot();
});
