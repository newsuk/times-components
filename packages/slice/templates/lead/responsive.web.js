import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";

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
    margin-top: 0;
  `
});
Separator.displayName = "Separator";

export const ChildrenContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    height: auto;
  `
});

export const getChildContainer = (isSecondChild, hasTwoChildren) =>
  withResponsiveStyles(View, {
    base: () => {
      const firstChildStyle = hasTwoChildren
        ? `
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #dbdbdb;
      padding-bottom: 10px;
    `
        : `
      padding-bottom: 0;
    `;

      const secondChildStyle = `
      padding-top: 10px;
    `;

      return `
      flex: 1;
      flex-wrap: wrap;
      min-height: auto;
      padding-left: 10px;
      padding-right: 10px;
      ${isSecondChild ? secondChildStyle : firstChildStyle}
    `;
    },
    mediumUp: () => `
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 0;
      padding-right: 0;
    `
  });

export const getContainer = hasChildren =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-top: 10px;
    height: auto;
    width: 100%;
  `,
    mediumUp: () => {
      const smallStyle = `
      padding-left: 0px;
      padding-right: 0px;
      width: ${config.mediumBpWidth};
    `;

      const largeStyle = `
      width: 100%;
    `;

      return `
      flex-direction: row;
      ${hasChildren ? largeStyle : smallStyle}
    `;
    },
    wideUp: () => `
    width: ${hasChildren ? "100%" : config.wideBpWidth};
  `
  });

export const getLeadContainer = hasChildren =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
    flex-grow: 1;
    padding-left: 10px;
    padding-right: 10px;
    width: ${hasChildren ? "auto" : "100%"};
  `,
    mediumUp: () => `
    flex-grow: ${hasChildren ? 3 : 0};
  `
  });
