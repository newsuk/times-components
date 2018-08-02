import timesStyleguide, {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";


const sharedStyles = (scale) => ({
  leadAsset: {
    marginBottom: spacing(2)
  },
  articleTextElement: {
    ...timesStyleguide({scale}).fontFactory({font: "body", fontSize: "bodyMobile"}),
    marginBottom: spacing(5),
    color: colours.functional.primary
  },
  articleMainContentRow: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  }
});

export default sharedStyles;
