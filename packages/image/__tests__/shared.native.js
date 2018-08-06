import React from "react";
import { ImageBackground, Modal } from "react-native";
import Link from "@times-components/link";
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
import Image, { ModalImage } from "../src";
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
    uri: "http://example.com/image.jpg"
  };

  const tests = [
    {
      name: "modal image",
      test() {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "prepend https schema",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image {...props} uri="//example.com/image.jpg" />
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
          .find(node => node.type === ImageBackground)
          .props.onLoad();

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "image url with a correctly formatted query string",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image {...props} uri="http://example.com/image.jpg?resize=1" />
        );

        expect(
          testInstance.root.find(node => node.type === ImageBackground).props
            .source.uri
        ).toEqual("http://example.com/image.jpg?resize=1");
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
          testInstance.root.find(node => node.type === ImageBackground).props
            .source.uri
        ).toEqual(dataUri);
      }
    },
    {
      name: "handle onPress event on the link",
      test: () => {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        const [, openButton] = testInstance.root.findAll(
          node => node.type === Link
        );

        openButton.props.onPress();

        const modal = testInstance.root.find(node => node.type === Modal);

        expect(modal.props.visible).toBe(true);
      }
    },
    {
      name: "handle onPress event on the close button",
      test: () => {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} show />
        );

        const [closeButton] = testInstance.root.findAll(
          node => node.type === Link
        );

        closeButton.props.onPress();

        const modal = testInstance.root.find(node => node.type === Modal);

        expect(modal.props.visible).toBe(false);
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
