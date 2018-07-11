import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const Watermark = ({ height, width }) => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={require("../assets/watermark.png")}
    style={{ height, width }}
  />
);

Watermark.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Watermark;
