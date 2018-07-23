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
import KeyFacts from "../../src/key-facts";
import data from "../../fixtures/key-facts-test.json";

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

it("key facts with title", () => {
  const wrapper = mount(<KeyFacts ast={data} onLinkPress={() => {}} />);

  expect(wrapper).toMatchSnapshot();
});

// eslint-disable-next-line global-require
require("jest-styled-components");
