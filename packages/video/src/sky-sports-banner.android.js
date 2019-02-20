import React from "react";
import { View } from "react-native";
import InnerSkySportsBanner from "./inner-sky-sports-banner";
import styles from "./styles";

const SkySportsBanner = () => (
  <View style={styles.skySportsBanner}>
    <InnerSkySportsBanner />
  </View>
);

export default SkySportsBanner;
