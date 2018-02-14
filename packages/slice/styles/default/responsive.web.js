import { StyleSheet } from "react-native";
import config from "@times-components/article/styles/responsive-config";

export const SliceContainerStyles = () => ({
  mediumUp: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
  `
});

export const ChildrenContainerStyles = childCount => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `,
  mediumUp: () => {
    let tabletStyles = `
      padding-left: 0;
      padding-right: 0;
      width: ${config.mediumBpWidth};
    `;
    if (childCount === 5) {
      tabletStyles = `
        padding-left: 10px;
        padding-right: 10px;
        width: auto;
      `;
    }
    return `
      flex-direction: row;
      margin: 0 auto;
      ${tabletStyles}
    `;
  },
  wideUp: () => `
    width: ${childCount === 5 ? "auto" : config.wideBpWidth};
  `
});
