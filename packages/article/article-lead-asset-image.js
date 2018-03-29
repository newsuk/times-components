import React from "react";
import Image from "@times-components/image";
import PropTypes from "prop-types";

const ArticleLeadAssetImage = ({ crop: { ratio, url } }) => {
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return <Image uri={url} aspectRatio={aspectRatio} />;
};

export const propTypes = {
  crop: PropTypes.shape({
    ratio: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

ArticleLeadAssetImage.propTypes = propTypes;

export default ArticleLeadAssetImage;
