import React from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Splash } from "@times-components/brightcove-video";
import Button from "@times-components/link";
import cropPropTypes from "./crop-proptypes";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage: { crop: { ratio: image_ratio, url: imageUrl } },
  onVideoPress
}) => {
  const [ratioWidth, ratioHeight] = image_ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  const { width } = Dimensions.get("window");
  const height = width / aspectRatio;

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
      <Splash poster={{ uri: imageUrl }} width={width} height={height} />
    </Button>
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
