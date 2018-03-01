/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import { DefaultSlice, LeadSlice } from "../";

module.exports = () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  context("DEFAULT template", () => {
    const items = [
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dc" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983dd" },
      { key: "08604618-fb0e-11e7-a987-7fcf5e9983de" }
    ];

    const createDefaultItems = noOfItems =>
      items
        .map((item, index) => {
          if (index >= noOfItems) return false;
          return <ExampleChild key={item.key} />;
        })
        .filter(item => item !== false);

    it("renders a single child element", () => {
      const wrapper = shallow(
        <DefaultSlice>{createDefaultItems(1)}</DefaultSlice>
      );
      expect(wrapper).toMatchSnapshot(
        "1. DEFAULT template renders a single child element"
      );
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <DefaultSlice>{createDefaultItems(2)}</DefaultSlice>
      );
      expect(wrapper).toMatchSnapshot(
        "2. DEFAULT template renders two child elements"
      );
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <DefaultSlice>{createDefaultItems(3)}</DefaultSlice>
      );
      expect(wrapper).toMatchSnapshot(
        "3. DEFAULT template renders three child elements"
      );
    });
  });

  context("LEAD_AND_TWO template", () => {
    it("renders a single child element", () => {
      const wrapper = shallow(<LeadSlice lead={<ExampleChild />} />);
      expect(wrapper).toMatchSnapshot(
        "4. LEAD_AND_TWO template renders a single child element"
      );
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <LeadSlice
          lead={<ExampleChild />}
          support1={<ExampleChild key="support1" />}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "5. LEAD_AND_TWO template renders two child elements"
      );
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <LeadSlice
          lead={<ExampleChild />}
          support1={<ExampleChild key="support1" />}
          support2={<ExampleChild key="support2" />}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "6. LEAD_AND_TWO template renders three child elements"
      );
    });
  });
};
