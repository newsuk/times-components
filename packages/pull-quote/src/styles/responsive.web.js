import { Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const PullQuoteContent = withResponsiveStyles(
  Text,
  {
    base: () => `
    color: ${colours.functional.primary};
    font-family: ${fonts.headlineRegular};
    font-size: ${fontSizes.pageComponentHeadline}px;
    line-height: 30px;
  `,
    mediumUp: () => `
    font-size: ${fontSizes.headline}px;
    line-height: 35px;
  `
  },
  "PullQuoteContent"
);

export default PullQuoteContent;
