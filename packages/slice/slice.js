import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import templateStyles from "./styles/styles";

const Slice = ({ children, template }) => {
  if (!children || children.length === 0) return null;

  const templateName = template.toLowerCase();

  const styles = StyleSheet.create({
    container: templateStyles[templateName].container,
    child: templateStyles[templateName].child
  });

  return (
    <View style={styles.container}>
      <View style={styles.child}>{children}</View>
    </View>
  );
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
