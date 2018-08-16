import styleguide from "@times-components/styleguide";

const { colours, fontFactory, fonts, spacing } = styleguide();
const sharedStyles = {
  opinionByline: {
    color: colours.section.comment,
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    }),
    fontWeight: "400"
  },
  text: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "body",
      fontSize: "teaser"
    }),
    marginBottom: spacing(2),
    flexWrap: "wrap"
  },
  metaText: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    marginBottom: spacing(1)
  },
  labelWrapper: {
    marginBottom: spacing(0)
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: spacing(1),
    fontFamily: fonts.headline,
    fontWeight: "900"
  },
  headlineWrapper: {
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    })
  }
};

export default sharedStyles;
