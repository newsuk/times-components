import React, { Fragment } from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import ArticleLeadAsset from "../src/article-lead-asset";
import shared from "./shared.base";

jest.mock("@times-components/Image", () => ({
  ModalImage: "ModalImage"
}));

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
      name:
        "passes the caption rendered by renderModalCaption to the ModalImage",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleLeadAsset
            getImageCrop={() => ({ ratio: "1:1", uri: "http://image" })}
            leadAsset={{}}
            renderCaption={() => <Text>Caption</Text>}
            renderModalCaption={() => <Text>Modal Caption</Text>}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
