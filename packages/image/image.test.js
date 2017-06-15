import "react-native";
import React from "react";
import Image from "./image";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Image />).toJSON();

  expect(tree).toBeTruthy();
});
