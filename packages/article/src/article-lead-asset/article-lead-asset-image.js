import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "@times-components/image";
import cropPropTypes from "./crop-prop-types";
import getStandardTemplateCrop from "./crop-config";

const ArticleLeadAssetImage = ({
  caption,
  credits,
  crop169,
  crop32,
  crop1251,
  crop11,
  crop45,
  crop23,
  width
}) => {
  const crop = getStandardTemplateCrop({
    crop11,
    crop23,
    crop32,
    crop45,
    crop169,
    crop1251
  });

  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <ModalImage
      aspectRatio={aspectRatio}
      caption={caption}
      credits={credits}
      highResSize={width}
      uri={url}
    />
  );
};

ArticleLeadAssetImage.propTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
  crop11: cropPropTypes,
  crop23: cropPropTypes,
  crop32: cropPropTypes,
  crop45: cropPropTypes,
  crop169: cropPropTypes,
  crop1251: cropPropTypes,
  width: PropTypes.number
};

ArticleLeadAssetImage.defaultProps = {
  caption: null,
  credits: null,
  crop11: null,
  crop23: null,
  crop32: null,
  crop45: null,
  crop169: null,
  crop1251: null,
  width: null
};

export default ArticleLeadAssetImage;
