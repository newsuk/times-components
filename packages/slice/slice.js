import React from "react";
import { StyleSheet, View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import getTemplateName from "./styles/template-map";
import getTemplateStyles from "./styles";

const Slice = ({ children, template }) => {
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
