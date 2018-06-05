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
    flex: 1,
    maxWidth: 800
  },
  listErrorContainer: {
    alignItems: "center",
    flex: 1,
    maxWidth: 548,
    paddingLeft: spacing(1),
    paddingRight: spacing(1)
  },
  listErrorHeading: {
    alignSelf: "center",
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    marginTop: spacing(4),
    textAlign: "center"
  },
  listErrorMessage: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.body,
    position: "relative",
    textAlign: "center",
    top: -spacing(4)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  }
};

export default styles;
