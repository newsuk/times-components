import "react-native";
import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  enzymeRootSerializer
} from "@times-components/jest-serializer";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "../src/article-flag";

module.exports = () => {
  describe("should render the", () => {
    addSerializers(expect, enzymeRootSerializer());

    it("New flag correctly", () => {
      const wrapper = shallow(<NewArticleFlag />);

      expect(wrapper).toMatchSnapshot("2. New flag");
    });

    it("Updated flag correctly", () => {
      const wrapper = shallow(<UpdatedArticleFlag />);

      expect(wrapper).toMatchSnapshot("3. Update flag");
    });

    it("Exclusive flag correctly", () => {
      const wrapper = shallow(<ExclusiveArticleFlag />);

      expect(wrapper).toMatchSnapshot("4. Exclusive flag");
    });

    it("Sponsored flag correctly", () => {
      const wrapper = shallow(<SponsoredArticleFlag />);

      expect(wrapper).toMatchSnapshot("5. Sponsored flag");
    });
  });
};
