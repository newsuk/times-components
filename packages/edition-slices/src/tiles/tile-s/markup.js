import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default {
  bold(key, attributes, renderedChildren) {
    return (
      <Text key={key} style={styles.bold}>
        {renderedChildren}
      </Text>
    );
  }
};
