import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    lineHeight: 24,
    marginTop: 0
  },
  opinionByline: {
    ...sharedStyles.opinionByline,
    lineHeight: 24,
    marginTop: 0
  }
});

export default styles;
