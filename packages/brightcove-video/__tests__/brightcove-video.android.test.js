import "react-native";
import React from "react";
import BrightcoveVideo from "../brightcove-video.android";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<BrightcoveVideo />).toJSON();

  expect(tree).toBeTruthy();
  expect(tree.type).toBe("RNTBrightcove");
});
