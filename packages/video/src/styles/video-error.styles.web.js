import { StyleSheet } from "react-native";
import { spacing, fonts } from "@times-components/styleguide";

export default StyleSheet.create({
  heading: {
    fontFamily: fonts.headline,
    fontSize: "20px",
    textAlign: "center",
    color: "white",
    width: "auto",
    height: "auto",
    marginBottom: spacing(2)
  },
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
  }
});
