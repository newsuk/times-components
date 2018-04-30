import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  paginationContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  paginationSpacing: {
    flex: 1,
    maxWidth: 800
  },
  listingErrorContainer: {
    alignSelf: "center",
    flexBasis: "50%",
    marginTop: "10%",
    maxWidth: 548
  },
  listingErrorHeading: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    marginBottom: 12,
    textAlign: "center"
  },
  listingErrorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.body,
    lineHeight: 1.44,
    textAlign: "center"
  },
  listingErrorRetryButton: {
    alignSelf: "center",
    maxWidth: 300,
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
    width: 200
  }
});

export default styles;
