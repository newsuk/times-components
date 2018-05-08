import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const HeadContainer = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    align-items: center;
    flex-direction: column;
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
  `,
  mediumUp: () => `
    padding-left: 0;
    padding-right: 0;
    max-width: ${config.mediumBpWidth};
  `,
  wideUp: () => `
    max-width: ${config.wideBpWidth};
`
});

export const Divider = withResponsiveStyles(View, {
  base: () => `
    border-top-color: ${colours.functional.keyline};
    border-top-style: solid;
    border-top-width: 1px;
    width: 199px;
  `,
  mediumUp: () => `
    width: 291px;
`
});

Divider.displayName = "Divider";
