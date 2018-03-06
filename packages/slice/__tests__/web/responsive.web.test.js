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
import {
  SupportsContainer,
  getSupportContainer,
  getContainer,
  getLeadContainer
} from "../../templates/lead/responsive";

describe("Slice tests on web", () => {
  context("responsive shared components", () => {
    it("renders SliceContainer correctly", () => {
      expect(renderer.create(<SliceContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders Separator correctly", () => {
      let Separator = getSeparator({ hasLeftRightMargin: false });
      expect(renderer.create(<Separator />).toJSON()).toMatchSnapshot();
      Separator = getSeparator({ hasLeftRightMargin: true });
      expect(renderer.create(<Separator />).toJSON()).toMatchSnapshot();
    });
  });

  context("responsive default template components", () => {
    it("renders ChildContainer correctly", () => {
      expect(renderer.create(<ChildContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders ChildrenContainer correctly", () => {
      let ChildrenContainer = getChildrenContainer({ childCount: 1 });
      expect(renderer.create(<ChildrenContainer />).toJSON()).toMatchSnapshot();
      ChildrenContainer = getChildrenContainer({ childCount: 3 });
      expect(renderer.create(<ChildrenContainer />).toJSON()).toMatchSnapshot();
    });
  });

  context("responsive lead and two template components", () => {
    it("renders SupportsContainer correctly", () => {
      expect(renderer.create(<SupportsContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders SupportContainer correctly", () => {
      let SupportContainer = getSupportContainer({ index: 0 });
      expect(renderer.create(<SupportContainer />).toJSON()).toMatchSnapshot();
      SupportContainer = getSupportContainer({ index: 1 });
      expect(renderer.create(<SupportContainer />).toJSON()).toMatchSnapshot();
    });

    it("renders Container correctly", () => {
      let Container = getContainer({ hasSupports: true });
      expect(renderer.create(<Container />).toJSON()).toMatchSnapshot();
      Container = getContainer({ hasSupports: false });
      expect(renderer.create(<Container />).toJSON()).toMatchSnapshot();
    });

    it("renders LeadContainer correctly", () => {
      let LeadContainer = getLeadContainer({ hasSupports: true });
      expect(renderer.create(<LeadContainer />).toJSON()).toMatchSnapshot();
      LeadContainer = getLeadContainer({ hasSupports: false });
      expect(renderer.create(<LeadContainer />).toJSON()).toMatchSnapshot();
    });
  });
});
