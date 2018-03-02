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
CardContainer.displayName = "CardContainer";

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
ImageContainer.displayName = "ImageContainer";

export const getChildContainer = ({ tabletChildRatio }) => {
  const ChildContainer = withResponsiveStyles(View, {
    base: () => `
    flex: 1;
  `,
    mediumUp: () => `
    flex: ${tabletChildRatio};
    flex-basis: 0 !important;
  `
  });
  ChildContainer.displayName = "ChildContainer";
  return ChildContainer;
};
