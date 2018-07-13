import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import VideoLabel from "../../src/video-label";

const styles = [
  "alignItems",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingBottom",
  "position",
  "top"
];

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    hoistStyleTransform,
    minimalWebTransform,
    replaceTransform({
      IconVideo: propsNoChildren,
      ...meltNative
    }),
    rnwTransform(styles)
  )
);

const tests = [
  {
    name: "video label with a title",
    test: () => {
      const wrapper = mount(<VideoLabel color="#008347" title="swimming" />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "video label without a title shows VIDEO",
    test: () => {
      const wrapper = mount(<VideoLabel color="#008347" />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "video label with the black default colour",
    test: () => {
      const wrapper = mount(<VideoLabel />);

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
