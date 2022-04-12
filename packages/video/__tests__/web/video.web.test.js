import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  replacePropTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import Video from "../../src/video";
import InlineVideoPlayer from "../../src/inline-video-player";
import defaultVideoProps from "../default-video-props";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/icons", () => ({
  IconVideo360Player: "IconVideo360Player"
}));

const omitProps = new Set(["className", "controls", "id", "style"]);

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimaliseTransform(
      (value, key) => omitProps.has(key) || key.includes("data-")
    ),
    minimalWebTransform,
    replacePropTransform(
      (value, key) => (key === "src" || key === "poster" ? hash(value) : value)
    )
  )
);

const tests = [
  {
    name: "360 video",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} is360 />
      );
      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  {
    name: "player icon for 360 video not displayed after play",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} is360 />
      );

      const VideoComponent = testInstance.root.findAllByType(InlineVideoPlayer);
      VideoComponent[0].instance.handlePlay();
      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);
