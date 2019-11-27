/* eslint-disable react/forbid-prop-types */
import React, { Component, isValidElement } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // TODO: need a native API for logging errors
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError || !isValidElement(children)) {
      const { attributes } = children || {};
      // Best effort attempt to show any text content
      if (attributes && attributes.value) {
        return <Text>{attributes.value}</Text>;
      }
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired
};
