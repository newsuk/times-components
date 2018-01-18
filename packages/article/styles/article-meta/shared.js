import { StyleSheet } from "react-native";

const sharedStyles = {
  articleMeta: {
    marginBottom: 20,
    borderBottomColor: "#d0cece",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 10,
    marginRight: 10
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  articleMetaElement: {
    borderTopColor: "#d0cece",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  datePublication: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium"
  },
  byline: {
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium",
    color: "#696969",
    lineHeight: 15
  }
};

export default sharedStyles;
