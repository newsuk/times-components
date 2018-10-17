import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import styles from "./styles";

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);
