import { StyleSheet } from "react-native";
import config from "@times-components/article/styles/responsive-config";

export const SliceContainerStyles = {
  mediumUp: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
  `
};

export const ChildrenContainerStyles = {
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `,
  mediumUp: () => `
    flex-direction: row;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    width: ${config.mediumBpWidth};
  `,
  wideUp: () => `
    width: ${config.wideBpWidth};
  `
};
