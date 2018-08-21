import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export default StyleSheet.create({
  errorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginHorizontal: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(14)
  },
  errorImageContainer: {
    alignSelf: "center",
    marginVertical: spacing(4)
  },
  errorHeading: {
    alignSelf: "center",
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    marginBottom: spacing(2),
    marginHorizontal: spacing(8),
    textAlign: "center"
  },
  errorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoSubText,
    marginHorizontal: spacing(8),
    textAlign: "center"
  }
});
