import React, { Fragment } from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import ArticleLeadAsset from "../src/article-lead-asset";

const props = {
  displayImage: {
    __typename: "Crop",
    ratio: "16:9",
    url: "https://crop169.io/"
  },
  getImageCrop: leadAsset => leadAsset.crop169,
  leadAsset: {
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
  },
  onVideoPress() {},
  // eslint-disable-next-line react/prop-types
  renderCaption: ({ captionProps }) => (
    <Fragment>
      <Text>{captionProps.text}</Text>
      <Text>{captionProps.credits}</Text>
    </Fragment>
  )
};

export default () => [
  {
    name: "renders correctly",
    test() {
      const testInstance = TestRenderer.create(<ArticleLeadAsset {...props} />);

      expect(testInstance).toMatchSnapshot();
    }
  }
];
