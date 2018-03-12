import { StyleSheet } from "react-native";
import { colours, fonts, spacing } from "@times-components/styleguide";

export default StyleSheet.create({
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: spacing.default,
    paddingRight: spacing.default
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: 26,
    color: colours.functional.primary
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: spacing.base,
    fontFamily: fonts.headline,
    fontWeight: "400"
  },
  imageContainer: {
    marginBottom: spacing.default
  }
});
