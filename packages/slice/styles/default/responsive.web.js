// @TODO: delete this file when related articles wired up properly
import { StyleSheet } from "react-native";
import config from "@times-components/responsive-styles";

export const ChildrenContainer = ({ childCount }) => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-top: 10px;
  `,
  mediumUp: () => {
    const smallStyle = `
      width: ${config.mediumBpWidth};
    `;

    const largeStyle = `
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
    `;

    return `
      flex-direction: row;
      margin: 0 auto;
      ${childCount >= 3 ? largeStyle : smallStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount >= 3 ? "100%" : config.wideBpWidth};
  `
});

export const ChildContainer = ({ isFirstChild }) => ({
  base: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: ${isFirstChild ? "0px" : "10px"};
  `,
  mediumUp: () => `
    border: 0;
    display: flex;
    flex-basis: 0 !important;
    flex-grow: 1;
    min-height: 100%;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  `
});
