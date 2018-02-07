import React from "react";
import { StyleSheet, View } from "react-native";
import slicePropTypes from "./proptypes";
import getTemplateStyles from "./styles";

const Slice = ({ children, template }) => {
  if (!children) return null;

  const styles = StyleSheet.create(getTemplateStyles(template));

  return (
    <View style={styles.container}>
      <View style={styles.child}>{children}</View>
    </View>
  );
};

Slice.propTypes = slicePropTypes;

export default Slice;
