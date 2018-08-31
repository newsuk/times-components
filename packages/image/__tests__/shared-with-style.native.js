import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import "./mocks";
import Image from "../src";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const tests = [
    {
      name: "default image",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image
            aspectRatio={3 / 2}
            highResSize={300}
            uri="http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
