/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Pagination from "./pagination";

it("renders correctly", () => {
  const tree = renderer.create(<Pagination />).toJSON();

  expect(tree).toMatchSnapshot();
});
