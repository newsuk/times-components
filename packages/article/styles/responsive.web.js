import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";
import config from "./responsive-config";

export const MainContainer = withResponsiveStyles(View, {
  wideUp: () => `
    padding-top: ${spacing.stackSmall}px; 
    margin: 0 auto;
  `
});

/* --- HeaderAd --- */
export const HeaderAdContainer = withResponsiveStyles(View, {
  base: () => `display: none;`,
  mediumUp: () => `
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: ${spacing.standard}px;
    padding-bottom: ${spacing.standard}px;
  `
});

/* --- Header --- */

export const HeaderContainer = withResponsiveStyles(View, {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `
    width: ${config.wideBpWidth};
    margin-bottom: ${spacing.headline}px;
  `
});

/* --- Meta --- */

export const MetaContainer = withResponsiveStyles(View, {
  mediumUp: () => `width: ${config.mediumBpWidth}; margin: 0 auto;`,
  wideUp: () => `
    margin-bottom: ${spacing.stackSmall}px;
    padding-right: ${spacing.insetStandard}px;
    padding-left: ${spacing.insetStandard}px;
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
