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
    paddingBottom: spacing(14),
    paddingTop: spacing(2)
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
  errorImageContainer: {
    alignSelf: "center",
    marginVertical: spacing(4)
  },
  errorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoSubText,
    marginHorizontal: spacing(8),
    textAlign: "center"
  }
});
