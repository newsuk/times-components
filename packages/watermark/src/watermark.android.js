import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const Watermark = ({ width, height }) => (
  <View
    style={{
      height,
      width,
      borderColor: colours.functional.keyline,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: colours.functional.backgroundSecondary
    }}
  />
);

Watermark.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Watermark;
