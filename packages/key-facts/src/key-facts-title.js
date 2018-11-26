import React from "react";
import { Text } from "react-native";
import propTypes from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ color, fontStyle, title }) => (
  <Text style={[styles.title, { color }, fontStyle]}>
    {title.toUpperCase()}
  </Text>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
