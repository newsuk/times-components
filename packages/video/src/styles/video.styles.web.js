import { StyleSheet } from "react-native";
import { spacing, fonts } from "@times-components/styleguide";

export default StyleSheet.create({
  noSubscriptionWrapper: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 65,
    marginTop: -32
  },
  noSubscriptionMessage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    maxWidth: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#FFFFFF",
    fontFamily: fonts.body,
    padding: spacing(2),
    textAlign: "center"
  }
});
