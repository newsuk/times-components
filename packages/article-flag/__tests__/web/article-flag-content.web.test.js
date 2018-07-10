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
import iterator from "@times-components/test-utils";
import ArticleFlag from "../../src/article-flag";

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

const tests = [
  {
    name: "article flag",
    test: () => {
      const wrapper = mount(<ArticleFlag title="No Colour" />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "red article flag",
    test: () => {
      const wrapper = mount(<ArticleFlag color="red" title="Coloured Red" />);

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
