import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";
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
    font-family: "TimesDigitalW04-Regular";
    line-height: 26px;
    font-size: 17px;
    margin-bottom: ${spacing.l}px;
    margin-top: 0;
    display: block;
  `,
  mediumUp: () => `
    font-size: 18px;
    line-height: 30px;
  `
});

export const LinkStyle = withResponsiveStyles("a", {
  base: () => `
    color: ${colours.functional.action};
    font-family: "TimesDigitalW04-Regular";
    line-height: 26px;
    font-size: 17px;
    margin-bottom: ${spacing.l}px;
    margin-top: 0;
`,
  mediumUp: () => `
    font-size: 18px;
    line-height: 30px;
  `
});

/* --- Lead Asset Styles --- */

export const LeadAsset = withResponsiveStyles(View, {
  base: () => `
    margin-bottom: ${spacing.default}px;
  `,
  mediumUp: () => `
    margin-bottom: ${spacing.m}px;
  `,
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
  padding-bottom: 20px;
`
);

export const MediaContainerMobile = config.showHideToggle(View, true);

export const MediaContainerDesktop = config.showHideToggle(View);

/* --- Article Images --- */

export const PrimaryImg = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    flex-direction: column;
    padding-bottom: ${spacing.l}px;
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
  padding-left: ${spacing.default}px;
  padding-right: ${spacing.default}px;
`;

export const SecondaryImg = withResponsiveStyles(View, {
  base: () => `
    ${imageStyles}
    padding-bottom: ${spacing.l}px;
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
    padding-left: ${spacing.default}px;
    padding-right: ${spacing.default}px;
    margin-bottom: ${spacing.default}px;
  `,
  mediumUp: () => `
    width: 60%;
    float: left;
    margin-right: ${spacing.m}px;
    margin-bottom 0;
    margin-top: ${spacing.base}px;
    padding-left: 0;
    padding-right: 0;
  `
});

export const PullQuoteContainer = withResponsiveStyles(View, {
  base: () => `display: block;`,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `width: ${config.wideBpWidth};`
});
