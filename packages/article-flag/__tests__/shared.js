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

export default () => {
  describe("should render the", () => {
    addSerializers(expect, enzymeRootSerializer());

    it("new flag", () => {
      const wrapper = shallow(<NewArticleFlag />);

      expect(wrapper).toMatchSnapshot("2. new flag");
    });

    it("updated flag", () => {
      const wrapper = shallow(<UpdatedArticleFlag />);

      expect(wrapper).toMatchSnapshot("3. updated flag");
    });

    it("exclusive flag", () => {
      const wrapper = shallow(<ExclusiveArticleFlag />);

      expect(wrapper).toMatchSnapshot("4. exclusive flag");
    });

    it("sponsored flag", () => {
      const wrapper = shallow(<SponsoredArticleFlag />);

      expect(wrapper).toMatchSnapshot("5. sponsored flag");
    });
  });
};
