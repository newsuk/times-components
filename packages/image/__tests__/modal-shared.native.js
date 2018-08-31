import React from "react";
import { Modal } from "react-native";
import TestRenderer from "react-test-renderer";
import Link from "@times-components/link";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import "./mocks";
import { ModalImage } from "../src";

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
    caption: "Test caption",
    credits: "Test credits",
    highResSize: 1440,
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
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

  iterator(tests);
};
