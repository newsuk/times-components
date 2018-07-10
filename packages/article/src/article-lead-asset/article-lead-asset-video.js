import React from "react";
import PropTypes from "prop-types";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage: { crop: { ratio: image_ratio, url: imageUrl } },
  onVideoPress
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
      videoId={brightcoveVideoId}
      width={width}
    />
  );
};

export const propTypes = {
  brightcoveVideoId: PropTypes.string.isRequired,
  brightcovePolicyKey: PropTypes.string.isRequired,
  brightcoveAccountId: PropTypes.string.isRequired,
  posterImage: PropTypes.shape({
    crop: cropPropTypes.isRequired
  }).isRequired,
  onVideoPress: PropTypes.func.isRequired
};

ArticleLeadAssetVideo.propTypes = propTypes;

export default ArticleLeadAssetVideo;
