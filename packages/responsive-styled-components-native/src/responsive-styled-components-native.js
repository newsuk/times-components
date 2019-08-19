/* eslint-disable global-require */
import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import styled, { css } from "styled-components/native";
import { SCREEN_WIDTH_PROP } from "./shared";

const serialise =
  process.env.NODE_ENV === "test"
    ? Platform.select({
        web: () => require("./serialise.web"),
        native: () => require("./serialise")
      })()
    : {};

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

// Wrap styled-components for a specific type but pass the current screen width
// as a prop to the inner styled-component (for use by mediaQuery)
function responsiveStyled(Type) {
  const typeName = Type.displayName || Type.name;

  // Need to ensure the screen width prop isn't passed through to the Type (e.g, View) or it
  // could cause warnings for unrecognised props when the props reach a host component
  const ResponsiveTypeWrapper = forwardRef(
    ({ [SCREEN_WIDTH_PROP]: _, ...props }, ref) => <Type {...props} ref={ref} />
  );

  ResponsiveTypeWrapper.displayName = `ResponsiveTypeWrapper(${typeName})`;

  const styledTag = styled(ResponsiveTypeWrapper);

  function responsiveStyledTag(...args) {
    const Styled = styledTag(...args);

    let ResponsiveStyled = forwardRef((props, ref) => {
      const screenWidth = useScreenWidth();
      const passedProps = {
        ...props,
        [SCREEN_WIDTH_PROP]: screenWidth
      };
      return <Styled {...passedProps} ref={ref} />;
    });

    if (process.env.NODE_ENV === "test") {
      ResponsiveStyled = serialise.markup(ResponsiveStyled, args);
    }

    ResponsiveStyled.displayName = `ResponsiveStyled(${typeName})`;
    Styled.displayName = `Styled(${typeName})`;

    return ResponsiveStyled;
  }

  return responsiveStyledTag;
}

responsiveStyled.View = responsiveStyled(View);
responsiveStyled.Text = responsiveStyled(Text);

export { css, serialise };
export { default as mediaQuery } from "./media-query";

export default responsiveStyled;
