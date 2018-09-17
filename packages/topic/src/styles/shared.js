import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguideFactory();
const styles = {
  wrapper: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: spacing(8),
    paddingHorizontal: spacing(2),
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 90
  },
  container: {
    alignItems: "center"
  },
  name: {
    ...fontFactory({ font: "headline", fontSize: "pageHeadline" }),
    color: colours.functional.brandColour,
    textAlign: "center"
  },
  description: {
    ...fontFactory({ font: "body", fontSize: "tertiary" }),
    textAlign: "center",
    color: colours.functional.primary
  },
  divider: {
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(5),
    width: 200,
    justifyContent: "center"
  }
};

export default styles;
