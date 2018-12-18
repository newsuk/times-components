import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
