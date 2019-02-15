import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const ItemColSeparator = ({ style }) => (
  <View style={[styles.itemColSeparator, style]} />
);
const ItemRowSeparator = ({ style }) => (
  <View style={[styles.itemRowSeparator, style]} />
);

ItemColSeparator.defaultProps = {
  style: {}
};

ItemRowSeparator.defaultProps = {
  style: {}
};

ItemColSeparator.propTypes = {
  style: PropTypes.shape({})
};

ItemRowSeparator.propTypes = {
  style: PropTypes.shape({})
};

export { ItemColSeparator, ItemRowSeparator };
