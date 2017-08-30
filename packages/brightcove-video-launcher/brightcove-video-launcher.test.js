/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

it("renders correctly", () => {
  const tree = renderer.create(<BrightcoveVideoLauncher />).toJSON();

  expect(tree).toMatchSnapshot();
});
