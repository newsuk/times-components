import { colours, fonts } from "@times-components/styleguide";

const sharedStyles = {
  text: {
    color: colours.functional.secondary,
    fontSize: 14,
    fontFamily: fonts.body,
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  metaText: {
    color: colours.functional.secondary,
    fontSize: 13,
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
    fontSize: 22,
    lineHeight: 22
  }
};

export default sharedStyles;
