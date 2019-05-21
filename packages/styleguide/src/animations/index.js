import React, { Component } from "react";
import { Animated } from "react-native";
import PropTypes from "prop-types";

class FadeIn extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    const { fadeAnim } = this.state;

    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: 1
    }).start();
  }

  componentWillUnmount() {
    const { fadeAnim } = this.state;
    fadeAnim.stopAnimation(() => {});
  }

  render() {
    const { fadeAnim } = this.state;
    const { children } = this.props;

    return (
      <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
    );
  }
}

FadeIn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default FadeIn;
