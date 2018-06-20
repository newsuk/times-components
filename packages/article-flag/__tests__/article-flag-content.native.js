import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import ArticleFlag from "../src/article-flag";

export default () => {
  describe("should render the", () => {
    addSerializers(expect, enzymeTreeSerializer());

    it("flag with no colour", () => {
      const wrapper = shallow(<ArticleFlag title="No Colour" />);

      expect(wrapper).toMatchSnapshot("1. Article flag");
    });

    it("flag with a colour", () => {
      const wrapper = shallow(<ArticleFlag title="Coloured Red" color="red" />);

      expect(wrapper).toMatchSnapshot("2. Red Article flag");
    });
  });
};
