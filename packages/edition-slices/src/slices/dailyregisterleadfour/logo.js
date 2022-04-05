import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const Logo = ({ imageUri, style, ratio }) => (
  <Image aspectRatio={ratio} style={style} uri={imageUri} />
);

Logo.propTypes = {
  imageUri: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired
};

export default Logo;
