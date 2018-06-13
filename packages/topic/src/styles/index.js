import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: spacing(10),
    paddingBottom: spacing(4),
    paddingHorizontal: spacing(2),
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 90
  },
  name: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.pageHeadline,
    color: colours.functional.brandColour
  },
  description: {
    fontFamily: fonts.body,
    textAlign: "center",
    fontSize: fontSizes.tertiary,
    lineHeight: 26,
    color: colours.functional.primary
  },
  divider: {
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginVertical: spacing(4),
    width: 200,
    justifyContent: "center"
  },
  container: {
    alignItems: "center"
  }
});

export default styles;
