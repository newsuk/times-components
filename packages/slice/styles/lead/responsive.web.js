import { StyleSheet } from "react-native";
import config from "@times-components/article/styles/responsive-config";

export const SliceContainer = () => ({
  mediumUp: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
  `
});

export const ChildrenContainer = childCount => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `,
  mediumUp: () => {
    const smallStyle = `
      padding-left: 0;
      padding-right: 0;
      width: ${config.mediumBpWidth};
    `;

    const largeStyle = `
      padding-left: 10px;
      padding-right: 10px;
      width: auto;
    `;

    return `
      flex-direction: row;
      margin: 0 auto;
      ${childCount === 1 ? smallStyle : largeStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount === 1 ? config.wideBpWidth : "auto"};
  `
});
