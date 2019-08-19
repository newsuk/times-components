import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compile";
import nativeStyled, { css } from "styled-components/native";
import webStyled from "styled-components";
import { MEDIA_QUERY_PROP_MAPPER_TAG, SCREEN_WIDTH_PROP } from "./shared";

const ID_ATTR = "data-responsive-styled-components-native-id";

let uuid = null;

if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line global-require
  uuid = require("uuid/v4");
}

const __INTERNALS__ = {
  mediaQueries: {},
  components: {}
};

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
    ({ [SCREEN_WIDTH_PROP]: _, ...props }, ref) => {
      return <Type {...props} ref={ref} />;
    }
  );

  ResponsiveTypeWrapper.displayName = `ResponsiveTypeWrapper(${typeName})`;

  const styledTag = nativeStyled(ResponsiveTypeWrapper);

  function responsiveStyledTag(...args) {
    const Styled = styledTag(...args);
    let hash;

    if (process.env.NODE_ENV === "test") {
      hash = uuid();

      __INTERNALS__.mediaQueries[hash] = args.filter(
        arg => !!arg[MEDIA_QUERY_PROP_MAPPER_TAG]
      );
    }

    const ResponsiveStyled = forwardRef((props, ref) => {
      const screenWidth = useScreenWidth();
      const passedProps = {
        ...props,
        [SCREEN_WIDTH_PROP]: screenWidth
      };

      if (process.env.NODE_ENV === "test") {
        passedProps[ID_ATTR] = hash;
      }

      return <Styled {...passedProps} ref={ref} />;
    });

    ResponsiveStyled.displayName = `ResponsiveStyled(${typeName})`;
    Styled.displayName = `Styled(${typeName})`;

    return ResponsiveStyled;
  }

  return responsiveStyledTag;
}

function getMediaQueries(node) {
  if (
    process.env.NODE_ENV !== "test" ||
    !node ||
    !node.props ||
    !node.props[ID_ATTR]
  ) {
    return [];
  }

  const id = node.props[ID_ATTR];
  const queries = __INTERNALS__.mediaQueries[id];

  if (!queries) {
    return [];
  }

  return queries.map(query => {
    const info = query[MEDIA_QUERY_PROP_MAPPER_TAG];
    const Styled = nativeStyled(View)`
      ${info.styles};
    `;

    const styleCreator = Styled.inlineStyle;
    const parsed = StyleSheet.flatten(
      styleCreator.generateStyleObject(node.props)
    );
    const converted = inline(parsed);
    const { rules } = webStyled.div(converted).componentStyle;

    return {
      args: info.args,
      rules
    };
  });
}

responsiveStyled.View = responsiveStyled(View);
responsiveStyled.Text = responsiveStyled(Text);

export { css, getMediaQueries, ID_ATTR };
export { default as mediaQuery } from "./media-query";

export default responsiveStyled;
