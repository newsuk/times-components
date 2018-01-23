import { StyleSheet } from "react-native";
import { Colors } from "@times-components/styleguide";

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
    color: Colours.midGrey,
    fontSize: 13,
    lineHeight: 13,
    fontFamily: "GillSansMTStd-Medium"
  },
  byline: {
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium",
    color: Colours.midGrey,
    lineHeight: 13
  }
};

export default sharedStyles;
