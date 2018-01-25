import { StyleSheet } from "react-native";

const sharedStyle = {
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  title: {
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    textAlign: "center",
    color: "#333",
    lineHeight: 59,
    height: 57
  },
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  }
};

export default sharedStyle;
