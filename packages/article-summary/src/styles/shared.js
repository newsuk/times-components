import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  opinionByline: {
    color: colours.section.comment,
    fontFamily: fonts.headline,
    fontSize: fontSizes.smallHeadline,
    fontWeight: "400"
  },
  text: {
    color: colours.functional.secondary,
    fontSize: fontSizes.teaser,
    fontFamily: fonts.body,
    lineHeight: 20,
    marginBottom: spacing(2),
    flexWrap: "wrap"
  },
  metaText: {
    color: colours.functional.secondary,
    fontSize: fontSizes.cardMeta,
    lineHeight: 15,
    fontFamily: fonts.supporting,
    marginBottom: spacing(1)
  },
  labelWrapper: {
    marginBottom: spacing(1)
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: spacing(1),
    fontFamily: fonts.headline,
    fontWeight: "900"
  },
  headlineWrapper: {
    fontSize: fontSizes.smallHeadline,
    lineHeight: 22
  }
};

export default sharedStyles;
