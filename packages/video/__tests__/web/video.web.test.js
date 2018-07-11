import React from "react";
import renderer from "react-test-renderer";
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
  const tree = renderer.create(<Video {...defaultVideoProps} />);
  expect(tree).toMatchSnapshot();
});
