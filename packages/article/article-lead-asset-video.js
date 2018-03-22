import React from "react";
import { Dimensions } from "react-native";
import BrightcoveVideo from "@times-components/brightcove-video";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  paidonly,
  caption,
  posterImage: {
    id: image_id,
    title: image_title,
    credits: image_credits,
    caption: image_caption,
    crop: { ratio: image_ratio, url: image_url }
  }
}) => {
  const { width } = Dimensions.get("window");
  return (
    <BrightcoveVideo
      width={width}
      policyKey={brightcovePolicyKey}
      videoId={brightcoveVideoId}
      accountId={brightcoveAccountId}
      poster={{ uri: image_url }}
      hideFullScreenButton
    />
  );
};

export default ArticleLeadAssetVideo;
