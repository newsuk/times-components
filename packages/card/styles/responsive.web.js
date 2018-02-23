import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const CardContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    flex-wrap: no-wrap;
  `,
  mediumUp: () => `
    flex-direction: row;
    flex-wrap: wrap;
  `
});

export const getImageContainer = imageMinWidth =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
    margin-bottom: 10px;
  `,
    mediumUp: () => `
    margin-bottom: 0;
    min-width: ${imageMinWidth}px;
    padding-right: 15px;
  `
  });
