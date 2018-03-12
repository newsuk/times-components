/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {
  SliceContainer,
  getSeparator
} from "../../templates/shared.responsive";
import {
  ChildContainer,
  getChildrenContainer
} from "../../templates/default/responsive";
import { getConfigWrapper as getDefaultConfigWrapper } from "../../templates/default/config";
import {
  SupportsContainer,
  getSupportContainer,
  getContainer,
  getLeadContainer
} from "../../templates/lead/responsive";
import { getConfigWrapper as getLeadConfigWrapper } from "../../templates/lead/config";

describe("Slice tests on web", () => {
  context("responsive shared components", () => {
    it("should render SliceContainer correctly", () => {
      expect(renderer.create(<SliceContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render Separator correctly", () => {
      let Separator = getSeparator({ hasLeftRightMargin: false });
      expect(renderer.create(<Separator />).toJSON()).toMatchSnapshot();
      Separator = getSeparator({ hasLeftRightMargin: true });
      expect(renderer.create(<Separator />).toJSON()).toMatchSnapshot();
    });
  });

  context("responsive default template components", () => {
    it("should render ChildContainer correctly", () => {
      expect(renderer.create(<ChildContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render ChildrenContainer correctly", () => {
      let ChildrenContainer = getChildrenContainer({ childCount: 1 });
      expect(renderer.create(<ChildrenContainer />).toJSON()).toMatchSnapshot();
      ChildrenContainer = getChildrenContainer({ childCount: 3 });
      expect(renderer.create(<ChildrenContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render ConfigWrapper correctly", () => {
      let ConfigWrapper = getDefaultConfigWrapper({ itemCount: 1 });
      expect(renderer.create(<ConfigWrapper />).toJSON()).toMatchSnapshot();
      ConfigWrapper = getDefaultConfigWrapper({ itemCount: 3 });
      expect(renderer.create(<ConfigWrapper />).toJSON()).toMatchSnapshot();
    });
  });

  context("responsive lead and two template components", () => {
    it("should render SupportsContainer correctly", () => {
      expect(renderer.create(<SupportsContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render SupportContainer correctly", () => {
      let SupportContainer = getSupportContainer({ index: 0 });
      expect(renderer.create(<SupportContainer />).toJSON()).toMatchSnapshot();
      SupportContainer = getSupportContainer({ index: 1 });
      expect(renderer.create(<SupportContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render Container correctly", () => {
      let Container = getContainer({ hasSupports: true });
      expect(renderer.create(<Container />).toJSON()).toMatchSnapshot();
      Container = getContainer({ hasSupports: false });
      expect(renderer.create(<Container />).toJSON()).toMatchSnapshot();
    });

    it("should render LeadContainer correctly", () => {
      let LeadContainer = getLeadContainer({
        hasSupports: true,
        supportCount: 1
      });
      expect(renderer.create(<LeadContainer />).toJSON()).toMatchSnapshot();
      LeadContainer = getLeadContainer({ hasSupports: true, supportCount: 2 });
      expect(renderer.create(<LeadContainer />).toJSON()).toMatchSnapshot();
      LeadContainer = getLeadContainer({ hasSupports: false });
      expect(renderer.create(<LeadContainer />).toJSON()).toMatchSnapshot();
    });

    it("should render ConfigWrapper correctly", () => {
      let ConfigWrapper = getLeadConfigWrapper({ supportCount: 1 });
      expect(renderer.create(<ConfigWrapper />).toJSON()).toMatchSnapshot();
      ConfigWrapper = getLeadConfigWrapper({ supportCount: 2 });
      expect(renderer.create(<ConfigWrapper />).toJSON()).toMatchSnapshot();
    });
  });
});
