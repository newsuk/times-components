/* global context */

import { Text } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import Slice from "../slice";

module.exports = () => {
  context("DEFAULT template", () => {
    const template = "DEFAULT";

    const items = [
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dc" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dd" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983de" }
    ];

    const ExampleChild = children => <Text>{children}</Text>;
    ExampleChild.displayName = "ExampleChild";

    const createItems = noOfItems =>
      items
        .map(item => {
          const { key } = item;
          if (key > noOfItems) return false;
          return <ExampleChild key={key}>Test text {key}</ExampleChild>;
        })
        .filter(item => item !== false);

    it("renders a single child element", () => {
      const wrapper = shallow(
        <Slice template={template}>{createItems(1)}</Slice>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <Slice template={template}>{createItems(2)}</Slice>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <Slice template={template}>{createItems(3)}</Slice>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
};
