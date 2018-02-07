import React from "react";
import { StyleSheet, View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import getTemplateStyles from "./styles";
import getTemplateName from "./template-map";

const Slice = ({ children, template }) => {
  if (!children) return null;

  const templateName = getTemplateName(template);
  const styles = StyleSheet.create(getTemplateStyles(templateName));

  return (
    <View style={styles.container}>
      <View style={styles.child}>{children}</View>
    </View>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
