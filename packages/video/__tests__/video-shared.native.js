import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import Video from "../src/video";
import defaultVideoProps from "./default-video-props";

jest.mock("@times-components/image", () => "Image");

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key.includes("Class")
      )
    )
  );

  const tests = [
    {
      name: "video",
      test: () => {
        const testInstance = TestRenderer.create(
          <Video {...defaultVideoProps} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "video without a poster image",
      test: () => {
        const testInstance = TestRenderer.create(
          <Video {...defaultVideoProps} poster={null} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
