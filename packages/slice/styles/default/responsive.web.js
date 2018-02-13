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
  mediumUp: () => `
    flex-direction: row;
    margin: 0 auto;
    padding-left: ${childCount === 5 ? "10px" : 0};
    padding-right: ${childCount === 5 ? "10px" : 0};
    width: ${childCount === 5 ? "auto" : config.mediumBpWidth};
  `,
  wideUp: () => `
    width: ${childCount === 5 ? "auto" : config.wideBpWidth};
  `
});
