import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  FixtureGeneratorBody: {
    ...sharedStyles.FixtureGeneratorBody,
    color: "blue"
  }
});

export default styles;
