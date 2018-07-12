import { StyleSheet } from "react-native";
import { fonts, spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  body: {
    fontFamily: fonts.body,
    fontSize: "14px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    width: 410,
    height: "auto",
    maxWidth: "80%"
  },
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  heading: {
    fontFamily: fonts.headline,
    fontSize: "20px",
    textAlign: "center",
    color: "white",
    width: "auto",
    height: "auto",
    marginBottom: spacing(2)
  }
});

export default styles;
