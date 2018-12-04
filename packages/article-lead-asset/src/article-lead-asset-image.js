import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "@times-components/image";
import { getStandardTemplateCrop } from "@times-components/utils";
import cropPropTypes from "./crop-prop-types";

const ArticleLeadAssetImage = ({
  crop11,
  crop23,
  crop32,
  crop45,
  crop169,
  crop1251,
  modalCaption,
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
      caption={modalCaption}
      highResSize={width}
      uri={url}
    />
  );
};

ArticleLeadAssetImage.propTypes = {
  crop11: cropPropTypes,
  crop23: cropPropTypes,
  crop32: cropPropTypes,
  crop45: cropPropTypes,
  crop169: cropPropTypes,
  crop1251: cropPropTypes,
  modalCaption: PropTypes.node,
  width: PropTypes.number
};

ArticleLeadAssetImage.defaultProps = {
  crop11: null,
  crop23: null,
  crop32: null,
  crop45: null,
  crop169: null,
  crop1251: null,
  modalCaption: null,
  width: null
};

export default ArticleLeadAssetImage;
