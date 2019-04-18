import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "./link";

class LinkWithPressedStyle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pressed: false
    };

    this.linkOnPress = this.linkOnPress.bind(this);
  }

  linkOnPress(evt) {
    const { onPress } = this.props;

    setTimeout(() => {
      this.setState({ pressed: false });
    }, 1000);

    this.setState({ pressed: true });

    if (onPress) {
      onPress(evt);
    }
  }

  render() {
    const { style, pressedStyle, children, ...restProps } = this.props;
    const { pressed } = this.state;

    return (
      <Link
        {...restProps}
        onPress={this.linkOnPress}
        responsiveLinkStyles={pressed ? pressedStyle : style}
      >
        {children}
      </Link>
    );
  }
}

LinkWithPressedStyle.defaultProps = {
  onPress: () => {},
  pressedStyle: null,
  style: null,
  target: null
};

LinkWithPressedStyle.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  pressedStyle: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  }),
  style: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  }),
  target: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default LinkWithPressedStyle;
