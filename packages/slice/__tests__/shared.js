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

  context("Standard template", () => {
    const createStandardItem = id => <ExampleChild id={`standard-${id}`} />;

    it("renders a single child element", () => {
      const wrapper = shallow(
        <StandardSlice
          itemCount={1}
          renderItems={() => ["1"].map(id => createStandardItem(id))}
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
          renderItems={() => ["1", "2"].map(id => createStandardItem(id))}
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
          renderItems={() => ["1", "2", "3"].map(id => createStandardItem(id))}
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
        <LeadAndTwoSlice lead={() => <ExampleChild id="lead" />} />
      );
      expect(wrapper).toMatchSnapshot(
        "4. Lead and two template renders a single child element"
      );
    });

    it("renders two child elements", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice
          lead={() => <ExampleChild id="lead" />}
          support1={() => <ExampleChild id="support1" />}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "5. Lead and two template renders two child elements"
      );
    });

    it("renders three child elements", () => {
      const wrapper = shallow(
        <LeadAndTwoSlice
          lead={() => <ExampleChild id="lead" />}
          support1={() => <ExampleChild id="support1" />}
          support2={() => <ExampleChild id="support2" />}
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
