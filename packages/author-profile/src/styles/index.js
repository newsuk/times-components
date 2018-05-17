import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  twitter: {
    flexDirection: "row",
    ...Platform.select({
      android: {
        alignItems: "center"
      }
    }),
    paddingVertical: 8
  },
  twitterLink: {
    color: colours.functional.action,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.tertiary,
    paddingLeft: spacing(1),
    textDecorationLine: "none"
  }
});

export default styles;
