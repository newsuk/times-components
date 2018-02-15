import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";
import Slice from "../slice";

module.exports = () => {
  context("DEFAULT template", () => {
    const template = "DEFAULT";

    it("renders a single child element", () => {
      const tree = renderer
        .create(
          <Slice template={template}>
            <Text key="test1">Test text</Text>
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders multiple child elements", () => {
      const tree = renderer
        .create(
          <Slice template={template}>
            <Text key="test1">Test text 1</Text>
            <Text key="test2">Test text 2</Text>
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
