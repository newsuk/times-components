import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headlineWrapper: {
    ...sharedStyles.headlineWrapper,
    lineHeight: 25
  },
  text: {
    ...sharedStyles.text,
    marginBottom: 0
  }
});

export default styles;
