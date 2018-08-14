import { StyleSheet } from "react-native";
import styleguide, { colours, spacing } from "@times-components/styleguide";

const { fontFactory } = styleguide();
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
    ...fontFactory({
      font: "headline",
      fontSize: "commentsHeadline"
    }),
    maxWidth: 315,
    paddingBottom: spacing(2),
    paddingTop: spacing(6),
    textAlign: "center"
  },
  supporting: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
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
