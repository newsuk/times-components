import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  authorHeadWrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  authorHeadContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: spacing(8),
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  authorHeadContainerNative: {
    paddingTop: spacing(6)
  },
  authorPhoto: {
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    marginBottom: spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    width: 100
  },
  name: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.headline
  },
  jobTitle: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegularSmallCaps,
    fontSize: fontSizes.meta
  },
  biographyContainer: {
    paddingBottom: spacing(6),
    paddingHorizontal: spacing(2)
  },
  biography: {
    color: colours.functional.primary,
    fontFamily: fonts.body,
    fontSize: fontSizes.secondary,
    lineHeight: 26,
    textAlign: "center"
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
