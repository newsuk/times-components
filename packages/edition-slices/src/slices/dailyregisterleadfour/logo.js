import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

const Logo = ({ imageSrc, style }) => (
  <Image resizeMode="contain" source={imageSrc} style={style} />
);

Logo.propTypes = {
  imageSrc: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}).isRequired
};

export default Logo;
