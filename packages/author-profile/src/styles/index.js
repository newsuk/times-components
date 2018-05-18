import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    minHeight: 264,
    width: "100%"
  },
  loadingGradient: {
    flex: 1
  },
  loadingRoundImage: {
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    position: "absolute",
    top: spacing(6),
    width: 100
  },
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
