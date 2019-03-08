import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  replacePropTransform,
  rnwTransform,
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
    ),
    rnwTransform(AppRegistry)
  )
);

const tests = [
  {
    name: "video marked as sky sports",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} skySports />
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  {
    name: "no sky banner displayed on play",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} skySports />
      );

      const VideoComponent = testInstance.root.findAllByType(InlineVideoPlayer);
      VideoComponent[0].instance.handlePlay();

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "360 video",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} playerId="foo" />
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  {
    name: "no sky banner displayed on play",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} playerId="foo" />
      );

      const VideoComponent = testInstance.root.findAllByType(InlineVideoPlayer);
      VideoComponent[0].instance.handlePlay();

      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);
