import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";
import config from "./responsive-config";

export const MainContainer = withResponsiveStyles(
  View,
  {
    wideUp: () => `
      padding-top: ${spacing(4)};
      margin: 0 auto;
      display: block;
    `
  },
  "MainContainer"
);

/* --- HeaderAd --- */
export const HeaderAdContainer = withResponsiveStyles(
  View,
  {
    base: () => `display: none;`,
    mediumUp: () => `
      display: flex;
      border-top-color: ${colours.functional.keyline};
      border-bottom-color: ${colours.functional.keyline};
      border-bottom-width: 1px;
      padding-top: ${spacing(2)};
      padding-bottom: ${spacing(2)};
    `
  },
  "HeaderAdContainer"
);

/* --- Header --- */

export const HeaderContainer = withResponsiveStyles(
  View,
  {
    base: () => `
      ${config.articleContainerPadding}
      order: 2
    `,
    mediumUp: () => config.mediumBpPositioning,
    wideUp: () => `
      width: ${config.wideBpWidth};
      margin-bottom: ${spacing(3)};
    `
  },
  "HeaderContainer"
);

/* --- Meta --- */

export const MetaContainer = withResponsiveStyles(
  View,
  {
    base: () => `
      order: 3;
    `,
    mediumUp: () => `width: ${config.mediumBpWidth}; margin: 0 auto;`,
    wideUp: () => `
      margin-bottom: ${spacing(4)};
      padding-right: ${spacing(4)};
      padding-left: ${spacing(4)};
      position: absolute;
      left: 0;
      width: 20.8333%;
      z-index: 1
    `
  },
  "MetaContainer"
);

/* --- Body --- */

export const LeadAssetContainer = withResponsiveStyles(
  View,
  {
    base: () => `
      order: 1;
    `
  },
  "LeadAssetContainer"
);

export const BodyContainer = withResponsiveStyles(
  View,
  {
    base: () => `
      display: block;
      order: 4;
    `
  },
  "BodyContainer"
);
