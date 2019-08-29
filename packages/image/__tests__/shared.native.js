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
import { appendParamsToQuery } from "../src/utils";

const getLayoutEventForWidth = width => ({
  nativeEvent: { layout: { height: width / 2, width } }
});

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
    aspectRatio: 2,
    highResSize: 900,
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0",
    relativeWidth: 0.5,
    relativeHeight: 0.4,
    relativeHorizontalOffset: 0.16666666666666666,
    relativeVerticalOffset: 0.2
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

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "handle onload event",
      test: () => {
        jest.useFakeTimers();

        const testInstance = TestRenderer.create(<Image {...props} />);

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        testInstance.root
          .findAll(node => node.type === ReactNativeImage)[0]
          .props.onLoad();

        expect(testInstance).toMatchSnapshot();

        jest.runAllTimers();

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "handle onload event with disabled placeholder",
      test: () => {
        jest.useFakeTimers();

        const testInstance = TestRenderer.create(
          <Image disablePlaceholder {...props} />
        );

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        testInstance.root
          .findAll(node => node.type === ReactNativeImage)[0]
          .props.onLoad();

        expect(testInstance).toMatchSnapshot();

        jest.runAllTimers();

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "componentWillUnmount cancels animation timer",
      test: () => {
        jest.useFakeTimers();

        const testRenderer = TestRenderer.create(<Image {...props} />);

        testRenderer.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        testRenderer.root
          .findAll(node => node.type === ReactNativeImage)[0]
          .props.onLoad();

        testRenderer.getInstance().componentWillUnmount();

        jest.runAllTimers();

        expect(testRenderer).toMatchSnapshot();
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

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        expect(
          testInstance.root.findAll(node => node.type === ReactNativeImage)[0]
            .props.source.uri
        ).toEqual(dataUri);
      }
    },
    {
      name: "uses highResSize if it exists",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image {...props} highResSize={600} />
        );

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "do not append resize if url already contains resize",
      test: () => {
        const uri =
          "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0&resize=100&offline=true&rel_height=0.4&rel_width=0.5&rel_horizontal_offset=0.16666666666666666&rel_vertical_offset=0.2";

        const testInstance = TestRenderer.create(
          <Image {...props} uri={uri} />
        );

        testInstance.root.children[0].props.onLayout(
          getLayoutEventForWidth(700)
        );

        const images = testInstance.root.findAll(
          node => node.type === ReactNativeImage
        );
        expect(images[0].props.source.uri).toEqual(uri);
      }
    },
    {
      name: "uses lowResSize image as placeholder if passed",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image {...props} highResSize={2000} lowResSize={800} />
        );
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "handle layout change",
      test() {
        const testRenderer = TestRenderer.create(<Image {...props} />);

        testRenderer.getInstance().onImageLayout(getLayoutEventForWidth(600));

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "builds a valid query string",
      test() {
        const uri =
          "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0&resize=100";

        const queryObject = {
          offline: true,
          rel_height: 200,
          rel_width: 100,
          rel_horizontal_offset: 10,
          rel_vertical_offset: 10
        };

        const result = appendParamsToQuery(uri, queryObject);

        expect(result).toEqual(
          "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0&resize=100&offline=true&rel_height=200&rel_width=100&rel_horizontal_offset=10&rel_vertical_offset=10"
        );
      }
    }
  ];

  shared(component => {
    const testInstance = TestRenderer.create(component);

    testInstance.root.children[0].props.onLayout(getLayoutEventForWidth(700));

    return testInstance;
  }, tests);
};
