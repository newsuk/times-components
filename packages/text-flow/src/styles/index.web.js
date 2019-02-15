import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  TextFlowBody: {
    ...sharedStyles.TextFlowBody,
    color: "blue"
  }
});

export default styles;
