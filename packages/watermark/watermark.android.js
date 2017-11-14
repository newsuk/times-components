import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Watermark = ({ width, height }) => <View style={{ height, width, borderColor: "#646464", borderWidth: StyleSheet.hairlineWidth, backgroundColor: "#e8e8e8" }}/>;

Watermark.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  export default Watermark;