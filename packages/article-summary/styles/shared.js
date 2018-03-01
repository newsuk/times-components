import { colours, fonts, fontSizes } from "@times-components/styleguide";

const sharedStyles = {
  text: {
    color: colours.functional.secondary,
    fontSize: fontSizes.teasers,
    fontFamily: fonts.body,
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  metaText: {
    color: colours.functional.secondary,
    fontSize: fontSizes.labels,
    lineHeight: 15,
    fontFamily: fonts.supporting,
    marginBottom: 5
  },
  labelWrapper: {
    marginBottom: 0
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: 5,
    fontFamily: fonts.headline,
    fontWeight: "400"
  },
  headlineWrapper: {
    fontSize: fontSizes.smallHeadline,
    lineHeight: 22
  }
};

export default sharedStyles;
