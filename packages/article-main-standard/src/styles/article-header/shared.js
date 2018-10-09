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
    paddingBottom: spacing(2)
  },
  articleLabel: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1)
  },
  articleFlag: {
    marginBottom: spacing(2),
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: spacing(3)
  }
};

export default sharedStyles;
