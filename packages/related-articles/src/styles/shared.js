import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguideFactory();
const styles = {
  titleContainer: {
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    display: "flex",
    padding: spacing(2),
    justifyContent: "center"
  },
  title: {
    color: colours.functional.primary,
    paddingTop: spacing(1),
    ...fontFactory({ font: "headline", fontSize: "pageComponentHeadline" })
  },
  headline: {
    color: colours.functional.primary,
    ...fontFactory({ font: "headline", fontSize: "smallHeadline" }),
    fontWeight: "400",
    marginBottom: spacing(1),
    marginTop: 0
  },
  byline: {
    marginBottom: 0
  },
  opinionByline: {
    lineHeight: 24,
    marginBottom: 0,
    marginTop: 0
  }
};

export default styles;
