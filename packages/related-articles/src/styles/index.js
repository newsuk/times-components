import { Platform, StyleSheet } from "react-native";
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
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: fontSizes.pageComponentHeadline
  },
  headline: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: 22,
    fontWeight: "400",
    lineHeight: Platform.OS === "web" ? 24 : 28,
    marginBottom: spacing(1),
    marginTop: Platform.OS === "web" ? 0 : spacing(-1)
  },
  byline: {
    marginBottom: 0
  },
  opinionByline: {
    lineHeight: Platform.OS === "web" ? 24 : 28,
    marginBottom: 0,
    marginTop: Platform.OS === "web" ? 0 : spacing(-1)
  }
});
