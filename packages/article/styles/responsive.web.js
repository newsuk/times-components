import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";
import config from "./responsive-config";

export const MainContainer = withResponsiveStyles(View, {
  wideUp: () => "padding-top: 20px; margin: 0 auto;"
});

/* --- HeaderAd --- */
export const HeaderAdContainer = withResponsiveStyles(View, {
  base: () => `display: none;`,
  mediumUp: () => `
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: 10px;
    padding-bottom: 10px;
  `
});

/* --- Header --- */

export const HeaderContainer = withResponsiveStyles(View, {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `
    width: ${config.wideBpWidth};
    margin-bottom: 15px;
  `
});

/* --- Meta --- */

export const MetaContainer = withResponsiveStyles(View, {
  mediumUp: () => `width: ${config.mediumBpWidth}; margin: 0 auto;`,
  wideUp: () => `
    margin-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
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
