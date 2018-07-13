import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const KeyFactsWrapper = ({ children }) => <View>{children}</View>;

KeyFactsWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default KeyFactsWrapper;
