import React from "react";
import { TcText } from "@times-components/utils";
import ArticleLeadAsset from "./src/article-lead-asset";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const imageLeadAsset = {
  caption: "Some Caption",
  credits: "Some Credits",
  crop169: {
    ratio: "16:9",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd67cded0-ca7a-11e8-998e-a6e3c63abd14.jpg?crop=1600%2C900%2C0%2C0&resize=754"
  }
};

const videoLeadAsset = {
  brightcoveAccountId: "5436121857001",
  brightcovePolicyKey:
    "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U",
  brightcoveVideoId: "5831024132001",
  posterImage: imageLeadAsset
};

// eslint-disable-next-line react/prop-types
const createCaption = label => ({ caption: { text, credits } }) => (
  <TcText>
    {label}: {text} {credits}
  </TcText>
);

export default {
  children: [
    {
      component: () => (
        <ArticleLeadAsset
          aspectRatio="16:9"
          displayImage={imageLeadAsset.crop169}
          getImageCrop={() => imageLeadAsset.crop169}
          leadAsset={imageLeadAsset}
          renderCaption={createCaption("caption")}
          width={400}
        />
      ),
      name: "Image",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ArticleLeadAsset
          aspectRatio="16:9"
          displayImage={videoLeadAsset.posterImage.crop169}
          getImageCrop={() => videoLeadAsset.posterImage.crop169}
          isVideo
          leadAsset={videoLeadAsset}
          onVideoPress={preventDefaultedAction(decorateAction)("onVideoPress")}
          renderCaption={createCaption("caption")}
          width={400}
        />
      ),
      name: "Video",
      type: "story"
    }
  ],
  name: "Primitives/Article Lead Asset"
};
