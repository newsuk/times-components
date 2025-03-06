/* eslint-disable react/forbid-prop-types */
import React from "react";
import { TcText, TcView } from "@times-components/utils";
import PropTypes from "prop-types";

const SomeComponent = ({ style, children }) => (
  <TcView style={style}>
    {children}
    <TcText>deeply nested</TcText>
  </TcView>
);

SomeComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.object
};

SomeComponent.defaultProps = {
  style: null
};

export default SomeComponent;
