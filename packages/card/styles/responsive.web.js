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

export const getChildContainer = childRatio =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
  `,
    mediumUp: () => `
    flex: ${childRatio};
  `
  });

export const getImageContainer = () =>
  withResponsiveStyles(View, {
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
