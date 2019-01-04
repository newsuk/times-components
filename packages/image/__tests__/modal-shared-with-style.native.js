import React from "react";
import { Text, View } from "react-native";
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
import { ModalImage } from "../src";

// eslint-disable-next-line react/prop-types
const MockCaption = ({ style: { text, container } }) => (
  <View style={container}>
    <Text style={text}>Caption</Text>
  </View>
);

const props = {
  aspectRatio: 3 / 2,
  caption: <MockCaption />,
  uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
};

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
      name: "default modal",
      test: () => {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
