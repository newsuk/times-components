import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listErrorButton: {
  	...sharedStyles.listErrorButton,
  	height: 36
  },
  listErrorButtonText: {
  	...sharedStyles.listErrorButtonText,
  	letterSpacing: 5.5
  }
});

export default styles;
