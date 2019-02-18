import styleguide from "@times-components/styleguide";

const { colours, fontFactory, fonts, spacing } = styleguide();
const sharedStyles = {
  flagWrapper: {
    marginBottom: spacing(2)
  },
  headline: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontWeight: "900",
    marginBottom: spacing(1)
  },
  headlineWrapper: {
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    })
  },
  labelWrapper: {
    marginBottom: spacing(0)
  },
  metaText: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    marginBottom: spacing(1)
  },
  strapline: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "strapline"
    }),
    color: colours.functional.secondary,
    paddingBottom: spacing(2)
  },
  text: {
    color: colours.functional.secondary,
    flexWrap: "wrap",
    marginBottom: spacing(2),
    ...fontFactory({
      font: "body",
      fontSize: "teaser"
    })
  }
};

export default sharedStyles;
