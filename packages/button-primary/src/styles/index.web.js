import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listErrorButtonText: {
    ...sharedStyles.listErrorButtonText,
    paddingTop: 3
  }
});

export default styles;
