import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import KeyFacts from "../../src/key-facts";
import data from "../../fixtures/key-facts.json";

const { data: { children, attributes } } = data;

const styles = [
  "backgroundColor",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "height",
  "letterSpacing",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingLeft",
  "top",
  "transform",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(stylePrinter, minimalWebTransform, rnwTransform(styles))
);

const tests = [
  {
    name: "key facts with title",
    test: () => {
      const wrapper = mount(
        <KeyFacts
          items={children[0].children}
          onLinkPress={() => {}}
          title={attributes.title}
        />
      );

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "key facts without title",
    test: () => {
      const wrapper = mount(
        <KeyFacts items={children[0].children} onLinkPress={() => {}} />
      );

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
