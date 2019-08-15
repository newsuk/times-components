import { css } from "styled-components/native";
import { breakpoints } from "@times-components/styleguide";
import { SCREEN_WIDTH_PROP } from "./shared";

// Creates a template tag which you can use inside our Responsive styled-components
// wrapper to selectively apply styles based on screen width.
function mediaQuery(shouldApplyStyles) {
  function mediaQueryTag(...templateStringArguments) {
    function styledComponentPropMapper(componentProps = {}) {
      const currentScreenWidth = componentProps[SCREEN_WIDTH_PROP];

      if (typeof currentScreenWidth === "undefined") {
        throw new Error(
          `Cannot use mediaQuery outside of @times-components/responsive-styled-components-native`
        );
      }

      return shouldApplyStyles(currentScreenWidth)
        ? css(...templateStringArguments)
        : "";
    }

    return styledComponentPropMapper;
  }

  return mediaQueryTag;
}

mediaQuery.minWidth = min => mediaQuery(width => width >= min);
mediaQuery.maxWidth = max => mediaQuery(width => width <= max);

// Not using a loop for code intelligence reasons.
mediaQuery.maxWidth.huge = mediaQuery.maxWidth(breakpoints.huge);
mediaQuery.minWidth.huge = mediaQuery.minWidth(breakpoints.huge);
mediaQuery.maxWidth.medium = mediaQuery.maxWidth(breakpoints.medium);
mediaQuery.minWidth.medium = mediaQuery.minWidth(breakpoints.medium);
mediaQuery.maxWidth.small = mediaQuery.maxWidth(breakpoints.small);
mediaQuery.minWidth.small = mediaQuery.minWidth(breakpoints.small);
mediaQuery.maxWidth.wide = mediaQuery.maxWidth(breakpoints.wide);
mediaQuery.minWidth.wide = mediaQuery.minWidth(breakpoints.wide);
mediaQuery.maxWidth.nativeTablet = mediaQuery.maxWidth(
  breakpoints.nativeTablet
);
mediaQuery.minWidth.nativeTablet = mediaQuery.minWidth(
  breakpoints.nativeTablet
);
mediaQuery.maxWidth.nativeTabletWide = mediaQuery.maxWidth(
  breakpoints.nativeTabletWide
);
mediaQuery.minWidth.nativeTabletWide = mediaQuery.minWidth(
  breakpoints.nativeTabletWide
);

export default mediaQuery;
