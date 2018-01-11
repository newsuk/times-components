import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 40,
    backgroundColor: "#F9F8F3"
  }
});

const AuthorHeadContainer = ({ style, children, WrapperComponent }) => (
  <View style={styles.wrapper} pointerEvents="box-none">
    <WrapperComponent
      accessibilityRole="banner"
      style={[styles.container, style]}
    >
      {children}
    </WrapperComponent>
  </View>
);

AuthorHeadContainer.defaultProps = {
  style: {},
  WrapperComponent: View
};

AuthorHeadContainer.propTypes = {
  style: TextPropTypesStyle,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  WrapperComponent: PropTypes.func
};

export default AuthorHeadContainer;
