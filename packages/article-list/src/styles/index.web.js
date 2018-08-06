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
    maxWidth: 760
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  adContainer: {
    borderColor: colours.functional.keyline,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: spacing(2)
  },
  retryButton: {
    alignSelf: "center",
    marginBottom: spacing(2),
    marginTop: spacing(8)
  },
  listContentErrorContainer: {
    flex: 1,
    margin: spacing(3)
  },
  listErrorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  },
  listErrorHeading: {
    alignSelf: "center",
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    marginBottom: spacing(2),
    marginTop: spacing(4),
    textAlign: "center"
  },
  listErrorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoSubText,
    textAlign: "center"
  },
  listEmptyStateContainer: {
    flex: 1,
    minHeight: 400
  },
  listEmptyMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoTitle,
    marginTop: spacing(28),
    textAlign: "center"
  },
  listEmptyWatermarkContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  listEmptyBackButton: {
    alignSelf: "center",
    marginBottom: spacing(2),
    marginTop: spacing(4)
  }
});

const watermarkStyles = {
  width: 500,
  height: 350,
  viewBox: "0 0 350 200"
};

export { watermarkStyles };
export default styles;
