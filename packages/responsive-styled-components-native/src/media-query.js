/* eslint-disable global-require */
import { Platform } from "react-native";
import { css } from "styled-components/native";
import { breakpoints } from "@times-components/styleguide";
import { SCREEN_WIDTH_PROP } from "./shared";

const { markupMediaQuery } =
  process.env.NODE_ENV === "test"
    ? Platform.select({
        web: () => require("./serialise.web"),
        native: () => require("./serialise")
      })
    : {};

// Creates a template tag which you can use inside our Responsive styled-components
// wrapper to selectively apply styles based on screen width.
function mediaQuery(shouldApplyStyles, tagInfo = {}) {
  function mediaQueryTag(...templateStringArguments) {
    const styles = css(...templateStringArguments);

    let styledComponentPropMapper = (componentProps = {}) => {
      const currentScreenWidth = componentProps[SCREEN_WIDTH_PROP];

      if (typeof currentScreenWidth === "undefined") {
        throw new Error(
          `Cannot use mediaQuery outside of @times-components/responsive-styled-components-native`
        );
      }

      return shouldApplyStyles(currentScreenWidth) ? styles : "";
    };

    // @todo Update tests for this
    if (process.env.NODE_ENV === "test") {
      styledComponentPropMapper = markupMediaQuery(styledComponentPropMapper, {
        args: "[custom-matcher]",
        styles,
        ...tagInfo
      });
    }

    return styledComponentPropMapper;
  }

  return mediaQueryTag;
}

mediaQuery.minWidth = min =>
  mediaQuery(width => width >= min, { args: `min-width:${min}px` });
mediaQuery.maxWidth = max =>
  mediaQuery(width => width <= max, { args: `max-width:${max}px` });

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
