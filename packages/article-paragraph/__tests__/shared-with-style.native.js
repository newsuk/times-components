import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  minimaliseTransform,
  flattenStyleTransform,
  print
} from "@times-components/jest-serializer";
import Responsive from "@times-components/responsive";
import { iterator } from "@times-components/test-utils";
import { Dimensions } from "react-native";
import { tabletWidth } from "@times-components/styleguide";

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
        Dimensions.set({
          window: {
            width: tabletWidth,
            height: 640
          }
        });
        const testInstance = TestRenderer.create(
          <Responsive>{renderParagraph(paragraphData)}</Responsive>
        );
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "responsive tablet paragraph with a drop cap",
      test: async () => {
        Dimensions.set({
          window: {
            width: tabletWidth,
            height: 640
          }
        });
        const testInstance = TestRenderer.create(
          <Responsive>{renderParagraph(dropCapData)}</Responsive>
        );
        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
};
