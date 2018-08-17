import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import "./mocks";
import Image, { ModalImage } from "../src";

const props = {
  aspectRatio: 3 / 2,
  uri: "http://example.com/image.jpg"
};

const styles = [
  "alignItems",
  "backgroundColor",
  "bottom",
  "display",
  "flex",
  "flexDirection",
  "flexGrow",
  "height",
  "justifyContent",
  "left",
  "opacity",
  "overflow",
  "paddingBottom",
  "position",
  "right",
  "top",
  "width",
  "zIndex"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      ),
      flattenStyleTransform,
      rnwTransform(AppRegistry, styles),
      hoistStyleTransform
    )
  );

  const tests = [
    {
      name: "default image",
      test: () => {
        const testInstance = TestRenderer.create(
          <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
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
