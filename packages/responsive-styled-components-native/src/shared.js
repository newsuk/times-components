/* eslint-disable import/prefer-default-export */

// This needs to be sufficiently long and "unique" that it won't
// clash with any props used by the consumers.
// I would use a Symbol but not currently supported.
// https://github.com/facebook/react/issues/7552
export const SCREEN_WIDTH_PROP =
  "@times-components/responsive-styled-components-native/screen-width";

export const MEDIA_QUERY_PROP_MAPPER_TAG = Symbol.for(
  "@times-components/responsive-styled-components-native/mediaQuery/info"
);
