import { StyleSheet } from "react-native";
import styleguideFactory, {
  colours,
  spacing
} from "@times-components/styleguide";

const { fontFactory } = styleguideFactory();
const styles = {
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
