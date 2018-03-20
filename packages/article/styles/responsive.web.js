import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";
import config from "./responsive-config";

export const MainContainer = withResponsiveStyles(View, {
  wideUp: () => `padding-top: ${4 * spacing}px; margin: 0 auto;`
});

/* --- HeaderAd --- */
export const HeaderAdContainer = withResponsiveStyles(View, {
  base: () => `display: none;`,
  mediumUp: () => `
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: ${2 * spacing}px;
    padding-bottom: ${2 * spacing}px;
  `
});

/* --- Header --- */

export const HeaderContainer = withResponsiveStyles(View, {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `
    width: ${config.wideBpWidth};
    margin-bottom: ${3 * spacing}px;
  `
});

/* --- Meta --- */

export const MetaContainer = withResponsiveStyles(View, {
  mediumUp: () => `width: ${config.mediumBpWidth}; margin: 0 auto;`,
  wideUp: () => `
    margin-bottom: ${4 * spacing}px;
    padding-right: ${4 * spacing}px;
    padding-left: ${4 * spacing}px;
    position: absolute;
    top: 0;
    width: 20.8333%;
  `
});

/* --- Body --- */

export const BodyContainer = withResponsiveStyles(View, {
  base: () => `
    display: block;
  `
});
