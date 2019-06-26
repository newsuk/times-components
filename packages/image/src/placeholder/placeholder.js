/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "../styles/index";
import T from "../logo/t";

function Placeholder({ borderRadius = 0 }) {
  return (
    <View
      height="100%"
      style={[styles.placeholder, borderRadius && { borderRadius }]}
      width="100%"
    >
      <T />
    </View>
  );
}

Placeholder.propTypes = {
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Placeholder;
