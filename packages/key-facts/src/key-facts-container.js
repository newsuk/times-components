import React from "react";
import { View } from "react-native";
import propTypes from "./key-facts-shared-prop-types";
import styleFactory from "./styles";

const styles = styleFactory();

const KeyFactsContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

KeyFactsContainer.propTypes = propTypes;

export default KeyFactsContainer;
