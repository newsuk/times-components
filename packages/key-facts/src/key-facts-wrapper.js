import React from "react";
import { View } from "react-native";
import propTypes from "./key-facts-container-prop-types";

const KeyFactsWrapper = ({ children }) => <View>{children}</View>;

KeyFactsWrapper.propTypes = propTypes;

export default KeyFactsWrapper;
