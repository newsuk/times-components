import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    marginBottom: spacing(5),
    width: "100%"
  },
  headline: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: fontSizes.commentsHeadline,
    lineHeight: 29,
    maxWidth: 315,
    paddingBottom: spacing(2),
    paddingTop: spacing(6),
    textAlign: "center"
  },
  supporting: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.tertiary,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280
  },
  link: {
    color: colours.functional.action
  },
  button: {
    marginTop: spacing(5),
    maxWidth: 215
  }
});

export default styles;
