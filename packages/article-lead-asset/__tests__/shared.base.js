import React, { Fragment } from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import ArticleLeadAsset from "../src/article-lead-asset";
import getRatio from "../src/get-ratio";

jest.mock("@times-components/image", () => ({
  __esModule: true,
  default: "Image",
  ModalImage: "ModalImage"
}));

jest.mock("@times-components/video", () => "Video");

const imageLeadAsset = {
  caption: "Chris Reynolds Gordon at one of his party venues in London",
  credits: "The credits",
  crop169: {
    ratio: "16:9",
    url: "https://crop169.io/"
  },
  crop1251: {
    ratio: "1.25:1",
    url: "https://crop1251.io/"
  }
};

export const props = {
  aspectRatio: "16:9",
  displayImage: {
    ratio: "16:9",
    url: "https://crop169.io/"
  },
  getImageCrop: leadAsset => leadAsset.crop169,
  leadAsset: imageLeadAsset,
  // eslint-disable-next-line react/prop-types
  renderCaption: ({ caption }) => (
    <Fragment>
      <Text>{caption.text}</Text>
      <Text>{caption.credits}</Text>
    </Fragment>
  ),
  width: 600
};

const videoProps = {
  ...props,
  isVideo: true,
  leadAsset: {
    id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    is360: false,
    brightcoveAccountId: "1234",
    brightcovePolicyKey: "policyKey",
    brightcoveVideoId: "5678",
    brightcovePlayerId: "3456",
    posterImage: imageLeadAsset
  },
  onVideoPress() {}
};

export default () => {
  it("getRatio correctly calculates the ratio", () => {
    expect(getRatio("5:2")).toEqual(2.5);
  });

  return [
    {
      name: "renders correctly with an image lead asset",
      test() {
        const testRenderer = TestRenderer.create(
          <ArticleLeadAsset {...props} />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "renders correctly with a video lead asset",
      test() {
        const testRenderer = TestRenderer.create(
          <ArticleLeadAsset {...videoProps} />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "renders correctly when there is no lead asset",
      test() {
        const testRenderer = TestRenderer.create(
          <ArticleLeadAsset {...props} leadAsset={null} />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    }
  ];
};
