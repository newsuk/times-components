import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  buttonContainer: {
    ...sharedStyles.buttonContainer,
    minWidth: 100,
    width: "100%"
  },
  textStyle: {
    ...sharedStyles.textStyle,
    paddingTop: 5
  }
});

export default styles;
