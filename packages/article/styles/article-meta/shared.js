import { StyleSheet } from "react-native";
import { fonts, colours, spacing } from "@times-components/styleguide";

const sharedStyles = {
  articleMeta: {
    marginBottom: spacing.m,
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: spacing.default,
    marginRight: spacing.default
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  articleMetaElement: {
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  datePublication: {
    color: colours.functional.secondary,
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fonts.supporting
  },
  byline: {
    fontSize: 13,
    fontFamily: fonts.supporting,
    color: colours.functional.secondary,
    lineHeight: 15
  }
};

export default sharedStyles;
