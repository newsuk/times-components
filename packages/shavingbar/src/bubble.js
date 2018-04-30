import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import Pressable from "./pressable";
import styles from "./styles";

const { primary, cancel: secondary } = colours.functional;

const Bubble = ({ render, onPress, isLoading, style, ...props }) => (
  <Pressable onPress={onPress}>
    {({ isActive, hover }) => {
      const backgroundColor = isActive && !isLoading ? primary : secondary;
      const borderColor = hover || isLoading ? primary : "rgb(219,219,219)";
      const computedStyle = [
        styles.bubble,
        {
          borderColor,
          backgroundColor
        },
        style
      ];

      return (
        <View
          {...props}
          aria-pressed={isActive}
          aria-disabled={isLoading}
          style={computedStyle}
        >
          {render({ isActive, hover })}
        </View>
      );
    }}
  </Pressable>
);

Bubble.propTypes = {
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  render: PropTypes.func.isRequired,
  ...ViewPropTypes
};

Bubble.defaultProps = {
  onPress: () => {},
  isLoading: false
};

export default Bubble;
