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
import Responsive from "@times-components/responsive";
import { Gestures, setDimension } from "./mocks";
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
    aspectRatio: 2,
    caption: <MockCaption />,
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
  };

  const tests = [
    {
      name: "modal image",
      test() {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        testInstance.root.findAllByType(Image).forEach(img =>
          img.children[0].props.onLayout({
            nativeEvent: { layout: { height: 350, width: 700 } }
          })
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "modal image with no caption",
      test() {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} caption={null} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "modal image with custom highResSize",
      test() {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} highResSize={900} />
        );

        testInstance.root.findAllByType(Image).forEach(img =>
          img.children[0].props.onLayout({
            nativeEvent: { layout: { height: 350, width: 700 } }
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
      name: "modal image uses screen width to set highResSize",
      test: () => {
        const width = 750;
        const testInstance = TestRenderer.create(
          <Responsive>
            <ModalImage {...props} />
          </Responsive>
        );

        setDimension({ width, height: width / 2 });

        const modalImage = testInstance.root.findAllByType(Image)[0];

        expect(modalImage.props.highResSize).toEqual(width);
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
    },
    {
      name: "handle onSwipeDown on the gesture controller",
      test: () => {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} show />
        );

        const gestureController = testInstance.root.findByType(Gestures);

        gestureController.props.onSwipeDown();

        const modal = testInstance.root.find(node => node.type === Modal);

        expect(modal.props.visible).toBe(false);
      }
    },
    {
      name: "image with onImagePress prop should not have Modal",
      test: () => {
        const onImagePress = () => {};
        const propWithImagePress = { ...props, onImagePress };
        const testInstance = TestRenderer.create(
          <ModalImage {...propWithImagePress} />
        );

        expect(testInstance.root.findAllByType(Modal).length).toBe(0);
      }
    },
    {
      name: "hides elements when tapping on the image",
      test: () => {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} show />
        );

        const gestureController = testInstance.root.findByType(Gestures);

        gestureController.props.onPress();

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "re-shows elements when tapping on the image a second time",
      test: () => {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} show />
        );

        const gestureController = testInstance.root.findByType(Gestures);

        gestureController.props.onPress();
        gestureController.props.onPress();

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
