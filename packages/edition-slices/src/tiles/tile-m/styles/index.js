import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const smallBreakpointStyles = {
  container: {
    paddingBottom: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22,
    marginBottom: spacing(1),
    marginTop: spacing(4),
    textAlign: "center"
  },
  star: verticalStyles,
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: spacing(8)
  }
};

const mediumBreakpointStyles = {
  container: {
    paddingBottom: spacing(6)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(1),
    marginTop: spacing(6),
    textAlign: "center"
  },
  star: verticalStyles,
  strapline: {
    color: colours.functional.primary,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    paddingBottom: spacing(1)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : smallBreakpointStyles;
