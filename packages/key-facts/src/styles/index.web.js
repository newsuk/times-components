import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  KeyFactsBody: {
    ...sharedStyles.KeyFactsBody,
    color: "blue"
  }
});

export default styles;
