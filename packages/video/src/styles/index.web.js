import { StyleSheet } from "react-native";
import { fonts, spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  background: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center"
  },
  body: {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: fonts.body,
    fontSize: "14px",
    height: "auto",
    maxWidth: "80%",
    textAlign: "center",
    width: 410
  },
  heading: {
    color: "white",
    fontFamily: fonts.headline,
    fontSize: "20px",
    height: "auto",
    marginBottom: spacing(2),
    textAlign: "center",
    width: "auto"
  }
});

export default styles;
