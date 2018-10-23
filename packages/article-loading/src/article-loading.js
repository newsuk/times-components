import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);
