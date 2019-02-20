import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  skySportsBanner: {
    ...sharedStyles.skySportsBanner,
    backgroundColor: "rgba(0, 0, 0, 0.5 )"
  }
});

export default styles;
