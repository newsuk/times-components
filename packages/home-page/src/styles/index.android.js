import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  HomePageBody: {
    ...sharedStyles.HomePageBody,
    color: "green"
  }
});

export default styles;
