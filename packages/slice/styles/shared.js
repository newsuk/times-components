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
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 57,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    color: "#333"
  },
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  },
  headline: {
    color: "#333333",
    marginBottom: 5,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  }
};

export default sharedStyle;
