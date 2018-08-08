import React from "react";
import { ModalImage } from "@times-components/image";
import cropPropTypes from "./crop-prop-types";

const ArticleLeadAssetImage = data => {
  console.log(data);
  const { crop: { ratio, url } } = data;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return <ModalImage aspectRatio={aspectRatio} uri={url} />;
};

export const propTypes = {
  crop: cropPropTypes.isRequired
};

ArticleLeadAssetImage.propTypes = propTypes;

export default ArticleLeadAssetImage;
