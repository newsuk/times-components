import React from "react";
import { Image as ReactNativeImage } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import "./mocks";
import Image from "../src";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "nativeBackgroundAndroid"
      ),
      replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
    )
  );

  const props = {
    aspectRatio: 3 / 2,
    highResSize: 900,
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
  };

  const tests = [
    {
      name: "prepend https schema",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image
            {...props}
            uri="//example.com/image.jpg?crop=1016%2C677%2C0%2C0"
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "handle onload event",
      test: () => {
        const testInstance = TestRenderer.create(<Image {...props} />);

        expect(testInstance).toMatchSnapshot();

        testInstance.root
          .find(node => node.type === ReactNativeImage)
          .props.onLoad();

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "data image url without a query string",
      test: () => {
        const dataUri =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        const testInstance = TestRenderer.create(
          <Image {...props} uri={dataUri} />
        );

        expect(
          testInstance.root.find(node => node.type === ReactNativeImage).props
            .source.uri
        ).toEqual(dataUri);
      }
    },
    {
      name: "use screen width if highResSize is not provided",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image {...props} highResSize={undefined} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
