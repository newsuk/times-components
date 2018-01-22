import { StyleSheet } from "react-native";

const sharedStyle = {
  headline: {
    fontSize: 22,
    lineHeight: 22
  },
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderTopWidth: StyleSheet.hairlineWidth,
    fontFamily: "TimesModern",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    paddingTop: 11,
    paddingBottom: 14
  },
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  }
};

export default sharedStyle;
