import React, { Component } from "react";
import { Animated } from "react-native";
import PropTypes from "prop-types";

class FadeIn extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        {this.props.children}
      </Animated.View>
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
