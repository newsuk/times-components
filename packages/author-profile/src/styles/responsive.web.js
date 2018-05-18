import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const AuthorHeadWrapper = withResponsiveStyles(
  View,
  {
    base: () => `
    padding-top: 30px;
  `,
    mediumUp: () => `
    padding-top: 60px;
  `
  },
  "AuthorHeadWrapper"
);

export const AuthorNameWrapper = withResponsiveStyles(
  Text,
  {
    base: () => `
    color: ${colours.functional.brandColour};
    font-family: ${fonts.headline};
    font-size: ${fontSizes.headline}px;
  `,
    mediumUp: () => `font-size: ${fontSizes.articleHeadline}px;`
  },
  "AuthorNameWrapper"
);

export const BioContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
  `,
    mediumUp: () => `
    padding-left: 0;
    padding-right: 0;
    max-width: 680px
  `,
    hugeUp: () => "max-width: 760px"
  },
  "BioContainer"
);

export const ImageContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    width: 100px;
  `,
    mediumUp: () => `
    width: 116px;
  `
  },
  "ImageContainer"
);
