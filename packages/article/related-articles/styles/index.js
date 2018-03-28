import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export default StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    display: "flex",
    height: 55,
    justifyContent: "center"
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.pageComponentHeadline,
    color: colours.functional.primary
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: spacing(1),
    fontFamily: fonts.headline,
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 22
  },
  byline: {
    marginBottom: 0
  }
});
