import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

addSerializers(
  expect,
  compose(print, minimaliseTransform((value, key) => key === "style"))
);

const tests = [
  {
    name: "video",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} />
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "video without a poster image",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} poster={null} />
      );

      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);
