import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

addSerializers(
  expect,
  compose(print, minimaliseTransform((value, key) => key === "style"))
);

it("1. video", () => {
  const testInstance = TestRenderer.create(<Video {...defaultVideoProps} />);
  expect(testInstance).toMatchSnapshot();
});
