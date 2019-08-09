import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

export default breakpoint => ({
  listItemContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1,
    marginHorizontal:
      breakpoint === editionBreakpoints.medium ? spacing(8) : spacing(2)
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
  tabletSpacing: {
    paddingTop: spacing(2)
  }
});
