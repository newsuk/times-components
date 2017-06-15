import "react-native";
import React from "react";
import Card from "./card";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Card />).toJSON();

  expect(tree).to.exist;
});
