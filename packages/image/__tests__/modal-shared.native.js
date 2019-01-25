import React from "react";
import { Modal, Text, View } from "react-native";
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
import Image, { ModalImage } from "../src";

// eslint-disable-next-line react/prop-types
const MockCaption = ({ style: { text, container } }) => (
  <View style={container}>
    <Text style={text}>Caption</Text>
  </View>
);

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
    caption: <MockCaption />,
    highResSize: 1440,
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
  };

  const tests = [
    {
      name: "modal image",
      test() {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        testInstance.root.findAllByType(Image).forEach(img =>
          img.children[0].props.onLayout({
            nativeEvent: { layout: { width: 700 } }
          })
        );

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
