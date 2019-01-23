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
  articleLabel: {
    paddingBottom: spacing(1),
    paddingTop: spacing(1)
  },
  flags: {
    marginBottom: spacing(2)
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    color: colours.functional.primary,
    paddingBottom: spacing(2)
  }
};

export default sharedStyles;
