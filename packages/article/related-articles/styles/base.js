import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 57,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    color: "#333"
  }
});
