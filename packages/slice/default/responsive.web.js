import { StyleSheet, View } from "react-native";
import withResponsiveStyles, { config } from "@times-components/responsive-styles";

export const SliceContainer = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    flex: 1;
    justify-content: center;
  `
});
SliceContainer.displayName = "SliceContainer";

export const Separator = withResponsiveStyles(View, {
  base: () => `
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #dbdbdb;
    flex: 1;
    margin-bottom: 10px;
    margin-top: 10px;
    min-width: auto;
  `,
  mediumUp: () => `
    border-bottom: none;  
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: #dbdbdb;
    flex: 0 !important;
    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 0;
    min-height: auto;
  `
});
Separator.displayName = "Separator";

export const getChildrenContainer = ({ childCount }) =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-top: 10px;
    width: 100%;
  `,
    mediumUp: () => {
      const smallStyle = `
      width: ${config.mediumBpWidth};
    `;

      const largeStyle = `
      width: 100%;
    `;

      return `
      flex-direction: row;
      ${childCount >= 3 ? largeStyle : smallStyle}
    `;
    },
    wideUp: () => `
    width: ${childCount >= 3 ? "100%" : config.wideBpWidth};
  `
  });

export const ChildContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => `
    padding-left: 0;
    padding-right: 0;
  `
});
