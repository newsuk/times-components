import React from "react";
import { Text } from "react-native";
import { androidLetterSpacing } from "@times-components/utils";
import { propTypes, defaultProps } from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ title }) => (
  <Text style={styles.title}>{androidLetterSpacing(title)}</Text>
);

KeyFactsTitle.propTypes = propTypes;
KeyFactsTitle.defaultProps = defaultProps;

export default KeyFactsTitle;
