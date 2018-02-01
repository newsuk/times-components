import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import templateStyles from "./styles/styles";

const Slice = ({ children, template }) => {
  if (!children || children.length === 0) return null;
  const styles = StyleSheet.create({
    template: templateStyles[template]
  });

  return <View style={styles.template}>{children}</View>;
};

Slice.propTypes = {
  template: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

Slice.defaultProps = {
  template: "DEFAULT"
};

export default Slice;
