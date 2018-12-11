import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  flattenStyleTransform,
  hoistStyleTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import shared from "./shared.base";

import ArticleLeadAsset from "../src/article-lead-asset";

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimalWebTransform,
    flattenStyleTransform,
    hoistStyleTransform,
    rnwTransform(AppRegistry)
  )
);
export default () =>
  iterator([
    ...shared(),
    {
      name: "correctly renders when there is no displayImage",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleLeadAsset displayImage={null} leadAsset={{}} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
