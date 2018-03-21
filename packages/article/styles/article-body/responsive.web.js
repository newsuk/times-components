import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import config from "../responsive-config";

/* --- Body --- */

export const ParagraphContainer = withResponsiveStyles(
  "div",
  {
    base: () => config.articleContainerPadding,
    mediumUp: () => config.mediumBpPositioning,
    wideUp: () => `width: ${config.wideBpWidth};`
  },
  "ParagraphContainer"
);

export const Paragraph = withResponsiveStyles(
  "p",
  {
    base: () => `
    color: ${colours.functional.primary};
    font-family: "${fonts.bodyRegular}";
    line-height: 26px;
    font-size: ${fontSizes.bodyMobile}px;
    margin-bottom: 25px;
    margin-top: 0;
    display: block;
  `,
    mediumUp: () => `
    font-size: ${fontSizes.body}px;
    line-height: 30px;
  `
  },
  "Paragraph"
);

export const LinkStyle = withResponsiveStyles(
  "a",
  {
    base: () => `
    color: ${colours.functional.action};
    font-family: "${fonts.bodyRegular}";
    line-height: 26px;
    font-size: ${fontSizes.bodyMobile}px;
    margin-bottom: 25px;
    margin-top: 0;
`,
    mediumUp: () => `
    font-size: ${fontSizes.body}px;
    line-height: 30px;
  `
  },
  "LinkStyle"
);

/* --- Lead Asset Styles --- */

export const LeadAsset = withResponsiveStyles(
  View,
  {
    base: () => "margin-bottom: 10px;",
    mediumUp: () => "margin-bottom: 20px",
    wideUp: () => `
      width: ${config.wideBpWidth};
      margin: 0 auto;
      padding-bottom: 20px;
    `
  },
  "LeadAsset"
);

export const LeadAssetCaptionContainer = withResponsiveStyles(
  View,
  {
    base: () => "display: none",
    wideUp: () => "display: flex"
  },
  "LeadAssetCaptionContainer"
);

/* --- Article Images --- */

export const PrimaryImg = withResponsiveStyles(
  View,
  {
    base: () => `
    width: 100%;
    flex-direction: column;
    padding-bottom: 25px;
  `,
    mediumUp: () => `
    width: ${config.mediumBpWidth};
    margin: 0 auto;
  `,
    wideUp: () => `width: ${config.wideBpWidth};`
  },
  "PrimaryImg"
);

const imageStyles = `
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SecondaryImg = withResponsiveStyles(
  View,
  {
    base: () => `
    ${imageStyles}
    padding-bottom: 25px;
  `,
    mediumUp: () => config.mediumBpPositioning,
    wideUp: () => `width: ${config.wideBpWidth};`
  },
  "SecondaryImg"
);

export const InlineImg = withResponsiveStyles(
  View,
  {
    base: () => `
    ${imageStyles}
    padding-bottom: 0;
    display:block;
  `,
    mediumUp: () => config.mediumBpPositioning,
    wideUp: () => `width: ${config.wideBpWidth};`
  },
  "InlineImg"
);

/* --- Pull Quotes --- */

export const PullQuoteResp = withResponsiveStyles(
  View,
  {
    base: () => `
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
  `,
    mediumUp: () => `
    width: 60%;
    float: left;
    margin-right: 20px;
    margin-bottom 0px;
    margin-top: 5px;
    padding-left: 0px;
    padding-right: 0px;
  `
  },
  "PullQuoteResp"
);

export const PullQuoteContainer = withResponsiveStyles(
  View,
  {
    base: () => `display: block;`,
    mediumUp: () => config.mediumBpPositioning,
    wideUp: () => `width: ${config.wideBpWidth};`
  },
  "PullQuoteContainer"
);
