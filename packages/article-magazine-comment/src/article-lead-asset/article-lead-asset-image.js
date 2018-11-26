import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "@times-components/image";
import { getStandardTemplateCrop } from "@times-components/utils";
import cropPropTypes from "./crop-prop-types";
import {
  leadAssetDefaults,
  leadAssetPropTypes
} from "./article-lead-asset-prop-types";

const ArticleLeadAssetImage = ({
  caption,
  credits,
  crop11,
  crop23,
  crop32,
  crop45,
  crop169,
  crop1251,
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

  if (crop === null) {
    return null;
  }

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
  ...leadAssetPropTypes,
  crop11: cropPropTypes,
  crop23: cropPropTypes,
  crop32: cropPropTypes,
  crop45: cropPropTypes,
  crop169: cropPropTypes,
  crop1251: cropPropTypes,
  width: PropTypes.number
};

ArticleLeadAssetImage.defaultProps = {
  ...leadAssetDefaults,
  crop11: null,
  crop23: null,
  crop32: null,
  crop45: null,
  crop169: null,
  crop1251: null,
  width: null
};

export default ArticleLeadAssetImage;
