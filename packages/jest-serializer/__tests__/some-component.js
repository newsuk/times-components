import React from "react";
import { Text, ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const SomeComponent = ({ style }) => <Text style={style} />;

SomeComponent.propTypes = {
  style: ViewPropTypesStyle
};

SomeComponent.defaultProps = {
  style: null
};
