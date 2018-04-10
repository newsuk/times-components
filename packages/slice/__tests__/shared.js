/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import {
  StandardSlice,
  standardRoles,
  LeadAndTwoSlice,
  leadAndTwoRoles,
  OpinionAndTwoSlice,
  opinionAndTwoRoles
} from "../src/slice";

export default () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  const createItem = id => <ExampleChild id={id} />;

  context("Standard template", () => {
    it("should render a single child element", () => {
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

    it("should render two child elements", () => {
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

    it("should render three child elements", () => {
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
    it("should render a single child element", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice lead={() => createItem("lead")} />
      );
      expect(wrapper).toMatchSnapshot(
        "4. Lead and two template renders a single child element"
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
        "5. Lead and two template renders two child elements"
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
        "6. Lead and two template renders three child elements"
      );
    });
  });

  context("Opinion and two template", () => {
    it("should render a single child element", () => {
      const wrapper = shallow(
        <OpinionAndTwoSlice opinion={() => createItem("opinion")} />
      );
      expect(wrapper).toMatchSnapshot(
        "7. Opinion and two template renders a single child element"
      );
    });

    it("should render two child elements", () => {
      const wrapper = shallow(
        <OpinionAndTwoSlice
          opinion={() => createItem("opinion")}
          renderSupports={() => [createItem("support-1")]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "8. Opinion and two template renders two child elements"
      );
    });

    it("should render three child elements", () => {
      const wrapper = shallow(
        <OpinionAndTwoSlice
          opinion={() => createItem("opinion")}
          renderSupports={() => [
            createItem("support-1"),
            createItem("support-2")
          ]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "9. Opinion and two template renders three child elements"
      );
    });
  });

  context("Roles", () => {
    it("should return the standard roles for tracking", () => {
      expect(standardRoles).toMatchSnapshot("10. Standard tracking roles");
    });

    it("should return the lead and two roles for tracking", () => {
      expect(leadAndTwoRoles).toMatchSnapshot(
        "11. Lead and two tracking roles"
      );
    });

    it("should return the opinion and two roles for tracking", () => {
      expect(opinionAndTwoRoles).toMatchSnapshot(
        "12. Opinion and two tracking roles"
      );
    });
  });
};
