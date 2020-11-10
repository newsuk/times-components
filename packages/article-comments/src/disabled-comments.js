import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const DisabledComments = () => (
  <View style={styles.container}>
    <Text style={styles.headline}>
      Comments for this article have been turned off
    </Text>
  </View>
);

export default DisabledComments;
