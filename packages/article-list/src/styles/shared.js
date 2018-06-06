import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = {
  paginationContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  paginationSpacing: {
    maxWidth: 800
  },
  listErrorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  },
  pageErrorImageContainer: {
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
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  }
};

export default styles;
