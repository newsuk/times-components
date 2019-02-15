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
  width
}) => {
  const {
    brightcoveVideoId,
    brightcovePolicyKey,
    brightcoveAccountId,
    skySports
  } = leadAsset;
  const height = width / aspectRatio;

  return (
    <Video
      accountId={brightcoveAccountId}
      height={height}
      onVideoPress={onVideoPress}
      policyKey={brightcovePolicyKey}
      poster={{ uri }}
      skySports={skySports}
      videoId={brightcoveVideoId}
      width={width}
    />
  );
};

ArticleLeadAssetVideo.propTypes = videoPropTypes;
ArticleLeadAssetVideo.defaultProps = videoDefaultProps;

export default ArticleLeadAssetVideo;
