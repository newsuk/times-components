// @TODO: delete this file when related articles wired up properly
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
      {children.map((child, index) => (
        <View key={child.key} style={styles.childContainer}>
          <View style={[styles.child, { paddingTop: index === 0 ? 0 : 10 }]}>
            {child}
          </View>
        </View>
      ))}
    </View>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
