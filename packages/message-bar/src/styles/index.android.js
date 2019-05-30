import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = (scale, breakpoint) =>
  StyleSheet.create(sharedStyles(scale, breakpoint));

export default styles;
