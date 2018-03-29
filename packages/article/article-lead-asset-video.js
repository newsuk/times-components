import React from "react";
import Image from "@times-components/image/image";
import Button from "@times-components/link/link";
import PropTypes from "prop-types";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage: { crop: { ratio: image_ratio, url: imageUrl } },
  onVideoPress
}) => {
  const [ratioWidth, ratioHeight] = image_ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;
  return (
    <Button
      onPress={e =>
        onVideoPress(e, {
          brightcoveAccountId,
          brightcovePolicyKey,
          brightcoveVideoId
        })
      }
    >
      <Image uri={imageUrl} aspectRatio={aspectRatio} />
    </Button>
  );
};

export const propTypes = {
  brightcoveVideoId: PropTypes.string.isRequired,
  brightcovePolicyKey: PropTypes.string.isRequired,
  brightcoveAccountId: PropTypes.string.isRequired,
  posterImage: PropTypes.shape({
    crop: PropTypes.shape({
      ratio: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onVideoPress: PropTypes.func.isRequired
};

ArticleLeadAssetVideo.propTypes = propTypes;

export default ArticleLeadAssetVideo;
