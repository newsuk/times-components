import React from "react";
import { Animated } from "react-native";

class FadeIn extends React.Component {
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

export default FadeIn;
