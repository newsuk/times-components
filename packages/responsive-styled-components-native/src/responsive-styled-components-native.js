import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import styled, { css } from "styled-components/native";
import { SCREEN_WIDTH_PROP } from "./shared";

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
  // will cause warnings for unrecognised DOM attributes
  const ResponsiveTypeWrapper = forwardRef(
    ({ [SCREEN_WIDTH_PROP]: _, ...props }, ref) => <Type {...props} ref={ref} />
  );

  ResponsiveTypeWrapper.displayName = `ResponsiveTypeWrapper(${typeName})`;

  const styledTag = styled(ResponsiveTypeWrapper);

  function responsiveStyledTag(...args) {
    const Styled = styledTag(...args);

    const ResponsiveStyled = forwardRef((props, ref) => {
      const screenWidth = useScreenWidth();
      const passedProps = { ...props, [SCREEN_WIDTH_PROP]: screenWidth };

      return <Styled {...passedProps} ref={ref} />;
    });

    ResponsiveStyled.displayName = `ResponsiveStyled(${typeName})`;
    Styled.displayName = `Styled(${typeName})`;

    return ResponsiveStyled;
  }

  return responsiveStyledTag;
}

responsiveStyled.View = responsiveStyled(View);
responsiveStyled.Text = responsiveStyled(Text);

export { css };
export { default as mediaQuery } from "./media-query";

export default responsiveStyled;
