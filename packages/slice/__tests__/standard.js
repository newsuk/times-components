/* global context */
import { View } from "react-native";
import React from "react";
import { shallow } from "enzyme";
import { StandardSlice, standardRoles } from "../src/slice";

export default () => {
  const ExampleChild = () => <View />;
  ExampleChild.displayName = "ExampleChild";

  const createItem = id => <ExampleChild id={id} />;

  context("Templates", () => {
    it("should handle no child elements", () => {
      const wrapper = shallow(
        <StandardSlice itemCount={0} renderItems={() => []} />
      );
      expect(wrapper).toMatchSnapshot(
        "1. Should handle empty child array and a zero item count"
      );
    });

    it("should render a single child element", () => {
      const wrapper = shallow(
        <StandardSlice
          itemCount={1}
          renderItems={() => [createItem("standard-1")]}
        />
      );
      expect(wrapper).toMatchSnapshot(
        "2. Standard template renders a single child element"
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
        "3. Standard template renders two child elements"
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
        "4. Standard template renders three child elements"
      );
    });
  });

  context("Roles", () => {
    it("should return the standard roles for tracking", () => {
      expect(standardRoles).toMatchSnapshot("5. Standard tracking roles");
    });
  });
};
