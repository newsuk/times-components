import React from "react";
import { Text } from "react-native";
import propTypes from "./key-facts-title-prop-types";

const KeyFactsTitle = ({ styles, title }) => (
  <Text style={styles.title}>{title.toUpperCase()}</Text>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
