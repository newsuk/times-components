import React from "react";
import { View } from "react-native";
import Gradient from "@times-components/gradient";
import styles from "./styles";

const AuthorProfileHeadLoading = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingRoundImage}>
      <Gradient style={styles.loadingGradient} />
    </View>
  </View>
);

export default AuthorProfileHeadLoading;
