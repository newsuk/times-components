import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  flattenStyleTransform,
  hoistStyleTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import shared, { props } from "./shared.base";

import ArticleLeadAsset from "../src/article-lead-asset";

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimalWebTransform,
    flattenStyleTransform,
    hoistStyleTransform
  )
);
export default () =>
  iterator([
    ...shared(),
    {
      name: "correctly renders when there is no displayImage",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleLeadAsset
            {...props}
            displayImage={null}
            leadAsset={{}}
            width={600}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "it renders correctly with a className",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleLeadAsset {...props} className="test-class-name" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
