import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  meltNative,
  minimaliseTransform,
  minimalWebTransform,
  print,
  propsNoChildren,
  replaceTransform,
  rnwTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import VideoLabel from "../../src/video-label";

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style" || key === "className"),
    replaceTransform({
      IconVideo: propsNoChildren,
      ...meltNative
    }),
    rnwTransform()
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
