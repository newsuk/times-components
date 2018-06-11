import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const Watermark = ({ width, height }) => (
  <Image
    // eslint-disable-next-line global-require
    source={require("../assets/watermark.png")}
    resizeMode="contain"
    style={{ width, height }}
  />
);

Watermark.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Watermark;
