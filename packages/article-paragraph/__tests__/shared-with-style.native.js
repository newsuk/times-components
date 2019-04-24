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
import { delay, iterator } from "@times-components/test-utils";
import { setIsTablet } from "@times-components/mocks/dimensions";

import renderParagraph from "./renderer";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import paragraphData from "./fixtures/paragraph-showcase.json";
import { callAllLayouts } from "./shared.base";

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
        await callAllLayouts(testInstance);
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
        await delay(0);
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
        await callAllLayouts(testInstance);
        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
};
