import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { FadeIn } from "@times-components/styleguide";
import styles from "./author-head-container.styles";

const AuthorHeadContainer = props => (
  <FadeIn>
    <View style={styles.wrapper} pointerEvents="box-none">
      <View
        accessibilityRole="banner"
        style={[styles.container, { paddingTop: 30 }]}
      >
        {props.children}
      </View>
    </View>
  </FadeIn>
);

AuthorHeadContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default AuthorHeadContainer;
