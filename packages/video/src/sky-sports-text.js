import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import propTypes from "./sky-sports-text-prop-types";

const SkySportsText = ({ text }) => (
  <Text style={styles.skySportsBannerText}>{text}</Text>
);

SkySportsText.propTypes = propTypes;

export default SkySportsText;
