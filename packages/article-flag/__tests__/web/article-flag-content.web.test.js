import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  stylePrinter,
  rnwTransform
} from "@times-components/jest-serializer";
import ArticleFlag from "../../src/article-flag";

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        ArticleFlag: justChildren,
        IconDiamond: propsNoChildren,
        ...meltNative
      }),
      minimalWebTransform,
      hoistStyleTransform,
      rnwTransform()
    )
  );

  describe("should render the", () => {
    it("flag with no colour", () => {
      const wrapper = mount(<ArticleFlag title="No Colour" />);

      expect(wrapper).toMatchSnapshot("1. Article flag");
    });

    it("flag with a colour", () => {
      const wrapper = mount(<ArticleFlag color="red" title="Coloured Red" />);

      expect(wrapper).toMatchSnapshot("2. Red Article flag");
    });
  });
});
