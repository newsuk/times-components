import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const separatorSpacingResolver = {
  [editionBreakpoints.small]: spacing(0),
  [editionBreakpoints.medium]: spacing(8),
  [editionBreakpoints.wide]: spacing(10),
  [editionBreakpoints.huge]: spacing(22.6)
};

export default breakpoint => ({
  listItemContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1,
    marginHorizontal: separatorSpacingResolver[breakpoint]
  },
  puzzleBarArrow: {
    paddingLeft: spacing(2),
    paddingTop: spacing(1)
  },
  puzzleBarContainer: {
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacing(4)
  },
  puzzleBarText: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headlineRegular,
    fontSize: 20
  },
  additionalContainerPadding: {
    paddingBottom: spacing(3)
  }
});
