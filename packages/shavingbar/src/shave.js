/* eslint-disable no-bitwise */
import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Shave = ({
  title,
  Icon,
  withFill,
  isActive,
  isShaving,
  isShaved,
  primary,
  secondary
}) =>
  isShaving ? (
    <ActivityIndicator />
  ) : (
    <Icon
      title={title}
      fillColour={
        (!withFill && isActive) || (withFill && (isActive || !isShaved))
          ? secondary
          : primary
      }
      strokeColour={withFill ^ isActive ? primary : secondary}
    />
  );

Shave.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  withFill: PropTypes.bool,
  isActive: PropTypes.bool,
  isShaved: PropTypes.bool,
  isShaving: PropTypes.bool,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
};

Shave.defaultProps = {
  isActive: false,
  isShaved: false,
  isShaving: false,
  withFill: false,
  primary: "black",
  secondary: "white"
};

export default Shave;
