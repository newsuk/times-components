import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 2;
    margin-bottom: 0;
    min-width: 350px;
  `,
  mediumUp: () => `
    padding-right: 15px;
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
