import { fonts, colours, spacing } from "@times-components/styleguide";

const sharedStyles = {
  leadAsset: {
    marginBottom: spacing.default
  },
  articleTextElement: {
    fontFamily: fonts.body,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: spacing.l,
    color: colours.functional.primary
  },
  articleMainContentRow: {
    paddingLeft: spacing.default,
    paddingRight: spacing.default
  }
};

export default sharedStyles;
