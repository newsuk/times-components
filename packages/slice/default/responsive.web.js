import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

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
      display: none;
    `,
  mediumUp: () => `
      border-right-style: solid;
      border-right-width: 1px;
      border-right-color: #dbdbdb;
      display: block;
      flex: 0 !important;
      margin-left: 10px;
      margin-right: 10px;
      min-height: auto;
    `
});
Separator.displayName = "Separator";

export const getChildrenContainer = ({ childCount }) => withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    width: 100%;
  `,
  mediumUp: () => {
    const smallStyle = `
      width: ${mediumBpWidth};
    `;

    const largeStyle = `
      width: 100%;
    `;

    return `
      flex-direction: row;
      padding-left: 0;
      padding-right: 0;
      ${childCount >= 3 ? largeStyle : smallStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount >= 3 ? "100%" : wideBpWidth};
  `
});
