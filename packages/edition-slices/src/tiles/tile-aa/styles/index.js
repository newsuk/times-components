import {
  fonts,
  spacing,
  globalSpacingStyles
} from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
};

export default styles;
