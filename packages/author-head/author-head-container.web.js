import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";
import styles from "./author-head-container.styles";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const AuthorHeadWrapper = withResponsiveStyles(View, {
  base: () => `
    padding-top: 30px;
  `,
  mediumUp: () => `
    padding-top: 60px;
  `
});

const AuthorHeadContainer = props => (
  <View style={styles.wrapper} pointerEvents="box-none">
    <AuthorHeadWrapper
      accessibilityRole="banner"
      style={[styles.container, props.style]}
    >
      {props.children}
    </AuthorHeadWrapper>
  </View>
);

AuthorHeadContainer.defaultProps = {
  style: {}
};

AuthorHeadContainer.propTypes = {
  style: TextPropTypesStyle,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default AuthorHeadContainer;
