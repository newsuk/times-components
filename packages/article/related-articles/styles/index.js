import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 55,
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
  },
  headline: {
    color: "#333333",
    marginBottom: 5,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  },
  imageContainer: {
    marginBottom: 10
  }
});
