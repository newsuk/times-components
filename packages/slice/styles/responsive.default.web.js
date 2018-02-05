import { StyleSheet } from "react-native";

const mediumBpWidth = "83.33333333%"; // @TODO: put these somewhere sensible
const wideBpWidth = "58.33333%";

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
    width: ${mediumBpWidth};
  `,
  wideUp: () => `
    width: ${wideBpWidth};
  `
};

export const ChildContainerStyles = {
  base: () => `
    flex-grow: 1;
  `,
  mediumUp: () => `
    flex-basis: 0 !important;
  `
};
