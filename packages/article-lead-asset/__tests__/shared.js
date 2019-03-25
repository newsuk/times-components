import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import shared from "./shared.base";
import ArticleLeadAsset from "../src/article-lead-asset";

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform
  )
);

export default () =>
  iterator([
    ...shared(),
    {
      name: "renders correctly when there is no available crop",
      test() {
        const testRenderer = TestRenderer.create(
          <ArticleLeadAsset
            getImageCrop={() => null}
            leadAsset={{}}
            width={600}
          />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    }
  ]);
