import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const TileImage = ({ aspectRatio, borderRadius, style, uri }) => (
  <Image aspectRatio={aspectRatio} borderRadius={borderRadius} uri={uri} style={style} />
);

TileImage.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  borderRadius: PropTypes.number,
  style: PropTypes.shape({}),
  uri: PropTypes.string.isRequired
};

TileImage.defaultProps = {
  borderRadius: undefined,
  style: null
};

export default TileImage;
