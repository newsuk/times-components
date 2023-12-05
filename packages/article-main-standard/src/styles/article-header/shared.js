import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const sharedStyles = {
  articleHeadlineSpacer: {
    marginBottom: spacing(3)
  },
  articleHeadLineText: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    }),
    color: colours.functional.brandColour,
    marginBottom: 7
  },
  articleHeadLineTextTablet: {
    ...fontFactory({
      font: "headline",
      fontSize: "articleHeadline"
    })
  },
  articleLabel: {
    paddingBottom: spacing(1),
    paddingTop: spacing(1)
  },
  flags: {
    marginBottom: spacing(2)
  },
  headerTablet: {
    marginTop: spacing(6)
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
