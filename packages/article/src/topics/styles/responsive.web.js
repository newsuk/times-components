import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import config from "../../styles/responsive-config";

export const TopicsContainer = withResponsiveStyles(View, {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioning,
  wideUp: () => `display: none`
});

export const TopicsMetaContainer = withResponsiveStyles(View, {
  base: () => `display: none;`,
  wideUp: () => `display: block;`
});
