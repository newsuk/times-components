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
import Image, { ModalImage } from "../src";

const props = {
  aspectRatio: 3 / 2,
  uri: "http://example.com/image.jpg"
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
