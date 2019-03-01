import React from "react";
import { View } from "react-native";
import { IconVideo360Player } from "@times-components/icons";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const video360Icon = () => (
  <View style={styles.video360Icon}>
    <IconVideo360Player fillColour={colours.functional.white} height={100} />
  </View>
);

export default video360Icon;
