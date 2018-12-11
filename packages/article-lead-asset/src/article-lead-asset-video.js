import React from "react";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";

import {
  videoPropTypes,
  videoDefaultProps
} from "./article-lead-asset-prop-types";

const ArticleLeadAssetVideo = ({
  aspectRatio,
  leadAsset,
  uri,
  onVideoPress
}) => {
  const {
    brightcoveVideoId,
    brightcovePolicyKey,
    brightcoveAccountId,
    skySports
  } = leadAsset;
  const width = screenWidth();
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
