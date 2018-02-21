/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import { DefaultSlice, LeadSlice } from "../slice";

module.exports = () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  context("DEFAULT template", () => {
    const items = [
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dc" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dd" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983de" }
    ];

    const createItems = noOfItems =>
      items
        .map(item => {
          const { key } = item;
          if (key > noOfItems) return false;
          return <ExampleChild key={key} />;
        })
        .filter(item => item !== false);

    it("renders a single child element", () => {
      const wrapper = shallow(<DefaultSlice>{createItems(1)}</DefaultSlice>);
      expect(wrapper).toMatchSnapshot();
    });

    it("renders two child elements", () => {
      const wrapper = shallow(<DefaultSlice>{createItems(2)}</DefaultSlice>);
      expect(wrapper).toMatchSnapshot();
    });

    it("renders three child elements", () => {
      const wrapper = shallow(<DefaultSlice>{createItems(3)}</DefaultSlice>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  context("LEAD_AND_TWO template", () => {
    it("renders a single child element", () => {
      const wrapper = shallow(<LeadSlice lead={() => <ExampleChild />} />);
      expect(wrapper).toMatchSnapshot();
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <LeadSlice
          lead={() => <ExampleChild />}
          child1={() => <ExampleChild />}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <LeadSlice
          lead={() => <ExampleChild />}
          child1={() => <ExampleChild />}
          child2={() => <ExampleChild />}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
};
