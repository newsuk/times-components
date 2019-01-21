import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  TileBody: {
    ...sharedStyles.TileBody,
    color: "blue"
  }
});

export default styles;
