import React from "react";
import { getStandardTemplateCrop, screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import articleLeadAssetVideoPropTypes from "./article-lead-asset-video-prop-types";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage,
  onVideoPress,
  skySports
}) => {
  const crop = getStandardTemplateCrop(posterImage);
  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  const width = screenWidth();
  const height = width / aspectRatio;

  return (
    <Video
      accountId={brightcoveAccountId}
      height={height}
      onVideoPress={onVideoPress}
      policyKey={brightcovePolicyKey}
      poster={{ uri: url }}
      skySports={skySports}
      videoId={brightcoveVideoId}
      width={width}
    />
  );
};

ArticleLeadAssetVideo.propTypes = articleLeadAssetVideoPropTypes;

export default ArticleLeadAssetVideo;
