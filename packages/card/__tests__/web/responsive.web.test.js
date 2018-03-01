/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {
  CardContainer,
  ImageContainer,
  getChildContainer
} from "../../styles/responsive";

describe("Card tests on web", () => {
  context("responsive shared components", () => {
    it("renders CardContainer correctly", () => {
      expect(renderer.create(<CardContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders ImageContainer correctly", () => {
      expect(renderer.create(<ImageContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders ChildContainer correctly", () => {
      const ChildContainer = getChildContainer({ childRatio: 2.2 });
      expect(renderer.create(<ChildContainer />).toJSON()).toMatchSnapshot();
    });
  });
});
