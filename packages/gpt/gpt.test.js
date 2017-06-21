import "react-native";
import React from "react";
import GPT from "./gpt.web";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<GPT />).toJSON();

  expect(tree).toBeTruthy();
});
