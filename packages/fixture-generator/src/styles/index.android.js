import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  FixtureGeneratorBody: {
    ...sharedStyles.FixtureGeneratorBody,
    color: "green"
  }
});

export default styles;
