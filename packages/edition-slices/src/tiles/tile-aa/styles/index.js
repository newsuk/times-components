import {
  fonts,
  spacing,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const styles = {
  container: {
    flex: 1,
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
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
