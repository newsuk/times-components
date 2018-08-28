import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headlineWrapper: {
    ...sharedStyles.headlineWrapper,
    lineHeight: 25
  }
});

export default styles;
