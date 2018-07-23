import React from "react";
import { Text } from "react-native";
import { androidLetterSpacing } from "@times-components/utils";
import propTypes from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ title }) => (
  <Text style={styles.title}>{androidLetterSpacing(title)}</Text>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
