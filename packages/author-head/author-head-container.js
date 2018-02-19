import React from "react";
import { Animated, Easing, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./author-head-container.styles";

class AuthorHeadContainer extends React.Component{
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 1,
        duration: 300
      }
    ).start();
  }

 render() {
  return (
    <Animated.View style={[styles.wrapper, {opacity: this.state.fadeAnim}]} pointerEvents="box-none">
    <View
      accessibilityRole="banner"
      style={[styles.container, { paddingTop: 30 }]}
    >
      {this.props.children}
    </View>
  </Animated.View>
  );
}
}


AuthorHeadContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default AuthorHeadContainer;
