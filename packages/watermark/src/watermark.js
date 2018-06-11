import React from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const Watermark = ({ width, height }) => (
  <Image
    source={require("./watermark.png")}
    resizeMode="contain"
    style={{ width: width, height: height }}
  />
);

Watermark.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Watermark;
