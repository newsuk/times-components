import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    flex-grow: 1;
    flex-shrink: 1 !important;
    margin-bottom: 10px;
  `,
  mediumUp: () => `
    flex-grow: 2;
    flex-basis: 0 !important;
    margin-bottom: 0;
  `
});

export const SummaryContainer = withResponsiveStyles(View, {
  base: () => `
    flex-grow: 1;
    flex-shrink: 1 !important;
  `,
  mediumUp: () => `
    padding-left: 15px;
    flex-grow: 2.7;
    flex-basis: 0 !important;
  `
});

export const CardContainer = withResponsiveStyles(View, {
  base: () => `
    flex-direction: column;
  `,
  mediumUp: () => `
    flex-direction: row;
  `
});
