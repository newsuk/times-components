import React from "react";
import { Text } from "react-native";
import propTypes from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ color, fontSize, title }) => (
  <Text style={[styles.title, { color, fontSize }]}>{title.toUpperCase()}</Text>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
