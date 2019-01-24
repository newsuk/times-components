import React from "react";
import { View } from "react-native";
import propTypes from "./key-facts-shared-prop-types";
import styles from "./styles";

const KeyFactsWrapper = ({ children }) => (
  <View style={styles.wrapper}>{children}</View>
);

KeyFactsWrapper.propTypes = propTypes;

export default KeyFactsWrapper;
