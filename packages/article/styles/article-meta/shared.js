import { StyleSheet } from "react-native";
import { fonts, colours } from "@times-components/styleguide";

const sharedStyles = {
  articleMeta: {
    marginBottom: 20,
    borderBottomColor: colours.functional.alto,
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
    borderTopColor: colours.functional.alto,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  datePublication: {
    color: colours.functional.doveGrey,
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fonts.supporting
  },
  byline: {
    fontSize: 13,
    fontFamily: fonts.supporting,
    color: colours.functional.doveGrey,
    lineHeight: 15
  }
};

export default sharedStyles;
