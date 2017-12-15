import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

const PageLabel = ({ direction }) => <Text>{direction}</Text>;

PageLabel.propTypes = {
  direction: PropTypes.string.isRequired
};

export default PageLabel;
