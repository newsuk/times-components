import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 22,
  [editionBreakpoints.wide]: 22,
  [editionBreakpoints.small]: 20,
  [editionBreakpoints.medium]: 20
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  },
  summaryContainer: {
    width: "100%"
  }
};

export default styles
