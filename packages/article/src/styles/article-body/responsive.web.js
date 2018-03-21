import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import config from "../responsive-config";

/* --- Body --- */

export const ParagraphContainer = withResponsiveStyles("div", {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `width: ${config.wideBpWidth};`
});

export const Paragraph = withResponsiveStyles("p", {
  base: () => `
    color: ${colours.functional.primary};
    font-family: "${fonts.bodyRegular}";
    line-height: 26px;
    font-size: ${fontSizes.bodyMobile}px;
    margin-bottom: ${spacing(5)};
    margin-top: 0;
    display: block;
  `,
  mediumUp: () => `
    font-size: ${fontSizes.body}px;
    line-height: 30px;
  `
});

export const LinkStyle = withResponsiveStyles("a", {
  base: () => `
    color: ${colours.functional.action};
    font-family: "${fonts.bodyRegular}";
    line-height: 26px;
    font-size: ${fontSizes.bodyMobile}px;
    margin-bottom: ${spacing(5)};
    margin-top: 0;
`,
  mediumUp: () => `
    font-size: ${fontSizes.body}px;
    line-height: 30px;
  `
});

/* --- Lead Asset Styles --- */

export const LeadAsset = withResponsiveStyles(View, {
  base: () => `margin-bottom: ${spacing(2)}`,
  mediumUp: () => `margin-bottom: ${spacing(4)}`,
  wideUp: () => "width: 100%; margin: 0 auto;"
});

export const LeadAssetMobile = config.showHideToggle(View, true);

export const LeadAssetDesktop = config.showHideToggle(
  View,
  false,
  `
  width: ${config.wideBpWidth};
  margin: 0 auto;
  // Temp padding for feature flag release
  padding-bottom: ${spacing(4)};
`
);

export const MediaContainerMobile = config.showHideToggle(View, true);

export const MediaContainerDesktop = config.showHideToggle(View);

/* --- Article Images --- */

export const PrimaryImg = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    flex-direction: column;
    padding-bottom: ${spacing(5)};
  `,
  mediumUp: () => `
    width: ${config.mediumBpWidth};
    margin: 0 auto;
  `,
  wideUp: () => `width: ${config.wideBpWidth};`
});

const imageStyles = `
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
`;

export const SecondaryImg = withResponsiveStyles(View, {
  base: () => `
    ${imageStyles}
    padding-bottom: ${spacing(5)};
  `,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `width: ${config.wideBpWidth};`
});

export const InlineImg = withResponsiveStyles(View, {
  base: () => `
    ${imageStyles}
    padding-bottom: 0;
    display:block;
  `,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `width: ${config.wideBpWidth};`
});

/* --- Pull Quotes --- */

export const PullQuoteResp = withResponsiveStyles(View, {
  base: () => `
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
    margin-bottom: ${spacing(2)};
  `,
  mediumUp: () => `
    width: 60%;
    float: left;
    margin-right: ${spacing(4)};
    margin-bottom 0px;
    margin-top: ${spacing(1)};
    padding-left: 0px;
    padding-right: 0px;
  `
});

export const PullQuoteContainer = withResponsiveStyles(View, {
  base: () => `display: block;`,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `width: ${config.wideBpWidth};`
});
