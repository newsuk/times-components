import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import styled, { css } from "styled-components/native";
import { breakpoints } from "@times-components/styleguide";

// This needs to be sufficiently long and "unique" that it won't
// clash with any props used by the consumers.
// I would use a Symbol but not currently supported.
// https://github.com/facebook/react/issues/7552
const SCREEN_WIDTH_PROP =
  "@times-components/responsive-styled-components-native/screen-width";

function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    function onDimensionsChange({ window }) {
      setScreenWidth(window.width);
    }

    Dimensions.addEventListener("change", onDimensionsChange);

    return () => Dimensions.removeEventListener("change", onDimensionsChange);
  }, []);

  return screenWidth;
}

// Creates a template tag which you can use inside our Responsive styled-components
// wrapper to selectively apply styles based on screen width.
function mediaQuery(shouldApplyStyles) {
  function mediaQueryTag(...templateStringArguments) {
    function styledComponentPropMapper(componentProps) {
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

// Wrap styled-components for a specific type but pass the current screen width
// as a prop to the inner styled-component (for use by mediaQuery)
function responsiveStyled(Type) {
  const typeName = Type.displayName || Type.name || Type;

  // Need to ensure the screen width prop isn't passed through to the Type (e.g, View) or it
  // will cause warnings for unrecognised DOM attributes
  const ResponsiveStyledComponent = forwardRef(
    ({ [SCREEN_WIDTH_PROP]: _, ...props }, ref) => <Type {...props} ref={ref} />
  );

  ResponsiveStyledComponent.displayName = `ResponsiveStyledComponent`;

  const styledTag = styled(ResponsiveStyledComponent);

  function responsiveStyledTag(...args) {
    const StyledComponent = styledTag(...args);

    const ResponsiveStyledComponent = forwardRef((props, ref) => {
      const screenWidth = useScreenWidth();
      const passedProps = { ...props, [SCREEN_WIDTH_PROP]: screenWidth };

      return <StyledComponent {...passedProps} ref={ref} />;
    });

    ResponsiveStyledComponent.displayName = `ResponsiveStyled(${typeName})`;
    StyledComponent.displayName = `Styled(${typeName})`;

    return ResponsiveStyledComponent;
  }

  return responsiveStyledTag;
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

responsiveStyled.View = responsiveStyled(View);
responsiveStyled.Text = responsiveStyled(Text);

export { responsiveStyled, mediaQuery };
