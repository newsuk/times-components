/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Diamond from "./diamond";

it("renders correctly", () => {
  const tree = renderer.create(<Diamond height={7} width={7} color={"green"} />).toJSON();

  expect(tree).toMatchSnapshot();
});
