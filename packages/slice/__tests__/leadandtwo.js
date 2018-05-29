/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import { LeadAndTwoSlice, leadAndTwoRoles } from "../src/slice";

export default () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  const createItem = id => <ExampleChild id={id} />;

  context("Lead and two template", () => {
    it("should render a single child element", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice lead={() => createItem("lead")} />
      );
      expect(wrapper).toMatchSnapshot(
        "1. Lead and two template renders a single child element"
      );
    });

    it("should render two child elements", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice
          lead={() => createItem("lead")}
          renderSupports={() => [createItem("support-1")]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "2. Lead and two template renders two child elements"
      );
    });

    it("should render three child elements", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice
          lead={() => createItem("lead")}
          renderSupports={() => [
            createItem("support-1"),
            createItem("support-2")
          ]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "3. Lead and two template renders three child elements"
      );
    });
  });

  context("Roles", () => {
    it("should return the lead and two roles for tracking", () => {
      expect(leadAndTwoRoles).toMatchSnapshot("4. Lead and two tracking roles");
    });
  });
};
