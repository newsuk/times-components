import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const Watermark = ({ width, height }) => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={require("../assets/watermark.png")}
    style={{ width, height }}
  />
);

Watermark.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Watermark;
