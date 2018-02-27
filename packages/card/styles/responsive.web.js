import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const CardContainer = withResponsiveStyles(View, {
  base: () => `
    flex-direction: column;
  `,
  mediumUp: () => `
    flex-direction: row;
  `
});

export const getChildContainer = childRatio => withResponsiveStyles(View, {
  base: () => `
    flex: 1;
  `,
  mediumUp: () => `
    flex: ${childRatio};
    flex-basis: 0 !important;
  `
});

export const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    margin-bottom: 10px;
  `,
  mediumUp: () => `
    flex: 2;
    margin-bottom: 0;
    padding-right: 15px;
  `
});
