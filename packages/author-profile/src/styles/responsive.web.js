import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const PageErrorContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    flex: 1;
    flex-direction: column-reverse;
    justify-content: space-between;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 10%;
  `,
    mediumUp: () => `
    padding-left: 15%;
    padding-right: 15%;
  `,
    wideUp: () => `
    flex-direction: row;
  `
  },
  "PageErrorContainer"
);

export const PageErrorImageContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    align-self: center;
    flex-basis: 50% !important;
    max-width: 75%;
    width: 100%;
  `,
    mediumUp: () => `
    max-width: 428px;
  `,
    wideUp: () => `
    max-width: none;
  `
  },
  "PageErrorImageContainer"
);
