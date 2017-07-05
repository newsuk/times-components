/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import BrightcoveVideo from "../brightcove-video.ios";

it("renders correctly", () => {
  const tree = renderer.create(<BrightcoveVideo />).toJSON();

  expect(tree).toMatchSnapshot();
});
