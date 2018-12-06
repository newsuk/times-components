import React from "react";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";

import { videoPropTypes, videoDefaultProps } from "./prop-types";

const ArticleLeadAssetVideo = ({
  getImageCrop,
  leadAsset: {
    brightcoveVideoId,
    brightcovePolicyKey,
    brightcoveAccountId,
    posterImage,
    skySports
  },
  onVideoPress
}) => {
  const crop = getImageCrop(posterImage);
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

ArticleLeadAssetVideo.propTypes = videoPropTypes;
ArticleLeadAssetVideo.defaultProps = videoDefaultProps;

export default ArticleLeadAssetVideo;
