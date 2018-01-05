import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import config from "./responsive-config";

export const MainContainer = withResponsiveStyles(View, {
  wideUp: () => "padding-top: 15px; margin: 0 auto;"
});

/* --- Header --- */

export const HeaderContainer = withResponsiveStyles(View, {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioningRS,
  wideUp: () => `width: ${config.wideBpWidth};`
});

/* --- Meta --- */

export const MetaContainer = withResponsiveStyles(View, {
  mediumUp: () => `width: ${config.mediumBpWidth}; margin: 0 auto;`,
  wideUp: () => `
    margin-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    position: absolute;
    top: 0;
    width: 20.8333%;
  `
});

/* --- Body --- */

const leadAssetBehaviour = leadAsset => (leadAsset ? "0" : "-9px");

export const BodyContainer = withResponsiveStyles(View, {
  base: () => `
    display: block;
    margin-top: ${props => leadAssetBehaviour(props.leadAsset)};
  `
});
