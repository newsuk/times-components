import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  text: {
    ...sharedStyles.text,
    // Gill Sans hack
    top: 2
  }
});

export default styles;
