import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import VideoLabel from "../../src/video-label";

const styles = [
  "paddingBottom",
  "color",
  "color",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "marginLeft",
  "padding",
  "position",
  "top",
  "alignItems",
  "flexDirection",
  "marginBottom"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    hoistStyleTransform,
    minimalWebTransform,
    replaceTransform({
      IconVideo: propsNoChildren
    }),
    rnwTransform(styles)
  )
);

it("1. video label with a title", () => {
  const wrapper = mount(<VideoLabel color="#008347" title="swimming" />);

  expect(wrapper).toMatchSnapshot();
});

it("2. video label without a title shows VIDEO", () => {
  const wrapper = mount(<VideoLabel color="#008347" />);

  expect(wrapper).toMatchSnapshot();
});

it("3. video label with the black default colour", () => {
  const wrapper = mount(<VideoLabel />);

  expect(wrapper).toMatchSnapshot();
});
