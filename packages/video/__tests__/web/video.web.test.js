import React from "react";
import renderer from "react-test-renderer";
import videoProps from "../default-video-props";
import Video from "../../src/video";

import {
  addSerializers,
  compose,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";

addSerializers(
  expect,
  compose(
    print,
    minimaliseTransform((value, key) => key === "style")
  )
);

it("1. video", () => {
  const tree = renderer.create(<Video {...videoProps} />);
  expect(tree).toMatchSnapshot();
});

it("2. video without a poster image", () => {
  const tree = renderer.create(
    <Video {...videoProps} poster={null} />
  );
  expect(tree).toMatchSnapshot();
});
