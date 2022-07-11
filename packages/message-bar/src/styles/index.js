import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = (scale, breakpoint) =>
  StyleSheet.create({
    ...sharedStyles(scale, breakpoint),
    messageManager: {
      ...sharedStyles(scale, breakpoint).messageManager,
      position: "fixed",
      left: 0
    }
  });

export default styles;
