import React from "react";
import Video from "@times-components/video";

import {
  videoPropTypes,
  videoDefaultProps
} from "./article-lead-asset-prop-types";

const ArticleLeadAssetVideo = ({
  aspectRatio,
  leadAsset,
  onVideoPress,
  uri,
  width,
  relativeWidth,
  relativeHeight,
  relativeHorizontalOffset,
  relativeVerticalOffset
}) => {
  const {
    brightcoveVideoId,
    brightcovePolicyKey,
    brightcoveAccountId
  } = leadAsset;
  const height = width / aspectRatio;

  return (
    <Video
      accountId={brightcoveAccountId}
      height={height}
      onVideoPress={onVideoPress}
      policyKey={brightcovePolicyKey}
      poster={{ uri }}
      videoId={brightcoveVideoId}
      width={width}
      relativeWidth={relativeWidth}
      relativeHeight={relativeHeight}
      relativeHorizontalOffset={relativeHorizontalOffset}
      relativeVerticalOffset={relativeVerticalOffset}
    />
  );
};

ArticleLeadAssetVideo.propTypes = videoPropTypes;
ArticleLeadAssetVideo.defaultProps = videoDefaultProps;

export default ArticleLeadAssetVideo;
