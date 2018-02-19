import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";
import Slice from "../slice";

module.exports = () => {
  context("DEFAULT template", () => {
    const template = "DEFAULT";

    const items = [
      { key: 1 },
      { key: 2 },
      { key: 3 }
    ];

    const createItems = noOfItems =>
      items
        .map(item => {
          const { key } = item;
          if (key > noOfItems) return false;
          return (
            <Text key={key} />
          );
        })
        .filter(item => item !== false);

    it("renders a single child element", () => {
      const tree = renderer
        .create(
          <Slice template={template}>
            {createItems(1)}
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders two child elements", () => {
      const tree = renderer
        .create(
          <Slice template={template}>
            {createItems(2)}
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders three child elements", () => {
      const tree = renderer
        .create(
          <Slice template={template}>
            {createItems(3)}
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
