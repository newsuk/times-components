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
  crop23
}) => {
  const crop = getStandardTemplateCrop({
    crop169,
    crop32,
    crop1251,
    crop11,
    crop45,
    crop23
  });

  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <ModalImage
      aspectRatio={aspectRatio}
      caption={caption}
      credits={credits}
      uri={url}
    />
  );
};

ArticleLeadAssetImage.propTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
  crop169: cropPropTypes,
  crop32: cropPropTypes,
  crop1251: cropPropTypes,
  crop11: cropPropTypes,
  crop45: cropPropTypes,
  crop23: cropPropTypes
};

ArticleLeadAssetImage.defaultProps = {
  caption: null,
  credits: null,
  crop169: null,
  crop32: null,
  crop1251: null,
  crop11: null,
  crop45: null,
  crop23: null
};

export default ArticleLeadAssetImage;
