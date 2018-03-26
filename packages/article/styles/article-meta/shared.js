import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  articleMeta: {
    marginBottom: spacing(4),
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: spacing(2),
    marginRight: spacing(2)
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
    fontSize: fontSizes.cardMeta,
    lineHeight: 15,
    fontFamily: fonts.supporting
  },
  byline: {
    fontSize: fontSizes.cardMeta,
    fontFamily: fonts.supporting,
    color: colours.functional.secondary,
    lineHeight: 15
  }
};

export default sharedStyles;
