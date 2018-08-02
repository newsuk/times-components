import { StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    marginBottom: 25,
    width: "100%"
  },
  headline: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: fontSizes.commentsHeadline,
    lineHeight: 29,
    maxWidth: 315,
    paddingBottom: 10,
    paddingTop: 30,
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
    marginTop: 25,
    maxWidth: 215
  }
});

export default styles;
