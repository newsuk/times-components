/* eslint-env jest */

import "react-native";
import renderer from "react-test-renderer";
import React from "react";
import CardLoading from "../card-loading";

it("renders loading card state", () => {
  const tree = renderer.create(<CardLoading />);

  expect(tree).toMatchSnapshot();
});
