import { StyleSheet } from "react-native";
import nativeStyles from "./native";

const androidStyles = {
  ...nativeStyles,
  metaTablet: {
    ...nativeStyles.metaTablet,
    paddingTop: "auto"
  }
};

const styles = StyleSheet.create({
  ...androidStyles
});

export default styles;
