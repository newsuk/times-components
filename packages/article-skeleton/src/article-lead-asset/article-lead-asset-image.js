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
  width: PropTypes.number
};

ArticleLeadAssetImage.defaultProps = {
  ...leadAssetDefaults,
  width: null
};

export default ArticleLeadAssetImage;
