import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: spacing(5)
  },
  paginationContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  paginationSpacing: {
    maxWidth: 800
  },
  listItemContainer: {
    paddingBottom: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(3)
  },
  listItemSeparatorContainer: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  showMoreRetryContainer: {
    alignSelf: "center",
    padding: spacing(5),
    width: "100%"
  },
  listErrorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  },
  listErrorImageContainer: {
    alignSelf: "center",
    marginBottom: spacing(4),
    marginTop: spacing(4)
  },
  listErrorHeading: {
    alignSelf: "center",
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    marginBottom: 10,
    textAlign: "center"
  },
  listErrorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoSubText,
    textAlign: "center"
  },
  listEmptyStateContainer: {
    flex: 1
  },
  listEmptyMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoTitle,
    marginTop: spacing(12),
    marginLeft: spacing(8),
    marginRight: spacing(8),
    textAlign: "center"
  },
  listEmptyWatermarkContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});

const watermarkStyles = {
  width: 300,
  height: 250
};

export { watermarkStyles };
export default styles;
