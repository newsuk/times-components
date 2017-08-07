/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import HTMLView from "./react-native-web-html-view";

it("renders correctly", () => {
  const tree = renderer
    .create(<HTMLView value={"<p>Hello, <i>world!</i></p>"} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
