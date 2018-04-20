import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

class Pressable extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      isActive: false
    };
  }

  hover(value) {
    return () => {
      this.setState({ hover: value });
      if (value) {
        this.props.onMouseEnter();
      } else {
        this.props.onMouseLeave();
      }
    };
  }

  pressed(isActive) {
    return () => {
      this.setState({ isActive });
      if (isActive) {
        this.props.onPressIn();
      } else {
        this.props.onPressOut();
      }
    };
  }

  render() {
    const { hover, isActive } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this.pressed(true)}
        onPressOut={this.pressed(false)}
        onMouseEnter={this.hover(true)}
        onMouseLeave={this.hover(false)}
      >
        {this.props.children({ isActive, hover })}
      </TouchableWithoutFeedback>
    );
  }
}

Pressable.propTypes = {
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.func.isRequired
};

Pressable.defaultProps = {
  onPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default Pressable;
