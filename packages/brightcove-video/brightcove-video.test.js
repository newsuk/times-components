import "react-native";
import React from "react";
import BrightcoveVideo from "./BrightcoveVideo";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<BrightcoveVideo />).toJSON();

  expect(tree).to.exist;
});
