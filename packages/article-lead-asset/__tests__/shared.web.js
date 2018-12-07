import React, { Fragment } from "react";
import { Text } from "react-native";
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
import ArticleLeadAsset from "../src/article-lead-asset";
import { AppRegistry } from "react-native-web";

jest.mock("@times-components/Image", () => "Image");

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

const getImageCrop = leadAsset => {
  return leadAsset.crop169;
};

export default () => {
  let props;

  beforeEach(() => {
    props = {
      getImageCrop,
      onVideoPress: jest.fn(),
      // eslint-disable-next-line react/prop-types
      renderCaption: ({ captionProps }) => (
        <Fragment>
          <Text>{captionProps.text}</Text>
          <Text>{captionProps.credits}</Text>
        </Fragment>
      )
    };
  });

  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <ArticleLeadAsset
        {...props}
        displayImage={{
          __typename: "Crop",
          ratio: "16:9",
          url: "https://crop169.io/"
        }}
        leadAsset={{
          __typename: "Image",
          caption: "Chris Reynolds Gordon at one of his party venues in London",
          credits: "The credits",
          crop169: {
            __typename: "Crop",
            ratio: "16:9",
            url: "https://crop169.io/"
          },
          crop1251: {
            __typename: "Crop",
            ratio: "1.25:1",
            url: "https://crop1251.io/"
          }
        }}
      />
    );

    expect(testInstance).toMatchSnapshot();
  });
};
