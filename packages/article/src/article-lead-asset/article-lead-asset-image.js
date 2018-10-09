import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "@times-components/image";
import cropPropTypes from "./crop-prop-types";
import { defaultOrdering } from "./crop-config";

const ArticleLeadAssetImage = ({
  caption,
  credits,
  crop169,
  crop32,
  crop1251,
  crop11,
  crop45,
  crop23
}) => {
  const crop = defaultOrdering({
    crop169,
    crop32,
    crop1251,
    crop11,
    crop45,
    crop23
  });

  const [ratioWidth, ratioHeight] = crop.ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <ModalImage
      aspectRatio={aspectRatio}
      caption={caption}
      credits={credits}
      uri={crop.url}
    />
  );
};

ArticleLeadAssetImage.propTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
  crop169: cropPropTypes.isRequired,
  crop32: cropPropTypes.isRequired,
  crop1251: cropPropTypes.isRequired,
  crop11: cropPropTypes.isRequired,
  crop45: cropPropTypes.isRequired,
  crop23: cropPropTypes.isRequired
};

ArticleLeadAssetImage.defaultProps = {
  caption: null,
  credits: null
};

export default ArticleLeadAssetImage;
