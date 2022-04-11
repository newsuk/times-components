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
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

const defaultWebVideoProps = {
  ...defaultVideoProps,
  poster: {
    uri: "https://image.io/poster"
  }
};

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/icons", () => ({
  IconVideo360Player: "IconVideo360Player"
}));

const omitProps = new Set(["className", "style"]);

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimaliseTransform(
      (value, key) => omitProps.has(key) || key.includes("data-")
    ),
    minimalWebTransform,
    replacePropTransform(
      (value, key) => (key === "uri" || key === "poster" ? hash(value) : value)
    )
  )
);

const tests = [
  {
    name: "video without a poster image",
    test: () => {
      const testInstance = TestRenderer.create(
        <IsPaidSubscriber.Provider value>
          <Video {...defaultWebVideoProps} poster={null} />
        </IsPaidSubscriber.Provider>
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  }
];

iterator(tests);
