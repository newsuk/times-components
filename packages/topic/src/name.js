import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const Name = ({ name }) => (
  <Text
    testID="topic-name"
    accessibilityLabel="topic-name"
    accessibilityRole="heading"
    style={styles.name}
  >
    {name}
  </Text>
);

export default Name;
