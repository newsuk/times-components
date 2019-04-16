import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  SaveStarWebBody: {
    ...sharedStyles.SaveStarWebBody,
    color: "green"
  }
});

export default styles;
