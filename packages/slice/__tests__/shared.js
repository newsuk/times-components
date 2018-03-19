/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import {
  StandardSlice,
  standardRoles,
  LeadAndTwoSlice,
  leadAndTwoRoles
} from "../";

module.exports = () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  const createItem = id => <ExampleChild id={id} />;

  context("Standard template", () => {
    it("renders a single child element", () => {
      const wrapper = shallow(
        <StandardSlice
          itemCount={1}
          renderItems={() => [createItem("standard-1")]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "1. Standard template renders a single child element"
      );
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <StandardSlice
          itemCount={2}
          renderItems={() => [
            createItem("standard-1"),
            createItem("standard-2")
          ]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "2. Standard template renders two child elements"
      );
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <StandardSlice
          itemCount={3}
          renderItems={() => [
            createItem("standard-1"),
            createItem("standard-2"),
            createItem("standard-3")
          ]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "3. Standard template renders three child elements"
      );
    });
  });

  context("Lead and two template", () => {
    it("renders a single child element", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice lead={() => createItem("lead")} />
      );
      expect(wrapper).toMatchSnapshot(
        "4. Lead and two template renders a single child element"
      );
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice
          lead={() => createItem("lead")}
          renderSupports={() => [createItem("support-1")]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "5. Lead and two template renders two child elements"
      );
    });

    it("renders three child elements", () => {
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
        "6. Lead and two template renders three child elements"
      );
    });
  });

  context("Roles", () => {
    it("should return the standard roles for tracking", () => {
      expect(standardRoles).toMatchSnapshot("7. Standard tracking roles");
    });

    it("should return the lead and two roles for tracking", () => {
      expect(leadAndTwoRoles).toMatchSnapshot("8. Lead and two tracking roles");
    });
  });
};
