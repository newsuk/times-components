import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const sharedStyles = {
  articleHeadLineText: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    }),
    color: colours.functional.brandColour,
    marginBottom: 7
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    color: colours.functional.primary,
    paddingBottom: 9
  },
  articleLabel: {
    paddingTop: 4,
    paddingBottom: spacing(1)
  },
  articleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: 14
  }
};

export default sharedStyles;
