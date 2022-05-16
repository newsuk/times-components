import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

export const linkStyles = {
  base: `
      color: ${colours.functional.action};
      font-family: "${fonts.bodyRegular}";
      line-height: 26px;
      font-size: ${fontSizes.bodyMobile}px;
      margin-bottom: ${spacing(5)}px;
      margin-top: 0;
  `,
  medium: `
      font-size: ${fontSizes.body}px;
      line-height: 30px;
  `
};

export const dropCapLinkStyles = {
  base: `
    font-size: inherit;
    text-decoration: none;
    color: ${colours.functional.action};
  `
};
