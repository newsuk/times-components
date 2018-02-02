import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import templateStyles from "./styles/styles";

const Slice = ({ children, template }) => {
  if (!children || children.length === 0) return null;

  const styles = StyleSheet.create({
    container: templateStyles[template].container,
    article1: {
      flexGrow: 1,
      borderStyle: "solid",
      borderColor: "red",
      borderWidth: 1,
      width: "50%"
    },
    article2: {
      flexGrow: 1
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.article1}>{children}</View>
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
