/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import { OpinionAndTwoSlice, opinionAndTwoRoles } from "../src/slice";

export default () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  const createItem = id => <ExampleChild id={id} />;

  context("Templates", () => {
    it("should render a single child element", () => {
      const wrapper = shallow(
        <OpinionAndTwoSlice opinion={() => createItem("opinion")} />
      );
      expect(wrapper).toMatchSnapshot(
        "1. Opinion and two template renders a single child element"
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
        "2. Opinion and two template renders two child elements"
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
        "3. Opinion and two template renders three child elements"
      );
    });
  });

  context("Roles", () => {
    it("should return the opinion and two roles for tracking", () => {
      expect(opinionAndTwoRoles).toMatchSnapshot(
        "4. Opinion and two tracking roles"
      );
    });
  });
};
