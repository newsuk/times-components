import React from "react";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import articleLeadAssetVideoPropTypes from "./article-lead-asset-video-prop-types";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage: { crop: { ratio: image_ratio, url: imageUrl } },
  onVideoPress,
  skySports
}) => {
  const [ratioWidth, ratioHeight] = image_ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  const width = screenWidth();
  const height = width / aspectRatio;

  return (
    <Video
      accountId={brightcoveAccountId}
      height={height}
      onVideoPress={onVideoPress}
      policyKey={brightcovePolicyKey}
      poster={{ uri: imageUrl }}
      skySports={skySports}
      videoId={brightcoveVideoId}
      width={width}
    />
  );
};

ArticleLeadAssetVideo.propTypes = articleLeadAssetVideoPropTypes;

export default ArticleLeadAssetVideo;
