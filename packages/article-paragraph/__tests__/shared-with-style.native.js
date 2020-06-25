import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  minimaliseTransform,
  flattenStyleTransform,
  print
} from "@times-components-native/jest-serializer";
import Responsive from "@times-components-native/responsive";
import { iterator } from "@times-components-native/test-utils";
import { setIsTablet } from "@times-components-native/mocks/dimensions";

import renderParagraph from "./renderer";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import paragraphData from "./fixtures/paragraph-showcase.json";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  iterator([
    {
      name: "paragraph with a drop cap",
      test: async () => {
        const testInstance = TestRenderer.create(renderParagraph(dropCapData));
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "responsive tablet paragraph",
      test: async () => {
        setIsTablet(true);
        const testInstance = TestRenderer.create(
          <Responsive>{renderParagraph(paragraphData)}</Responsive>
        );
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "responsive tablet paragraph with a drop cap",
      test: async () => {
        setIsTablet(true);
        const testInstance = TestRenderer.create(
          <Responsive>{renderParagraph(dropCapData)}</Responsive>
        );
        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
};
