import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const getContainer = ({ supportCount }) => {
  const Container = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      height: auto;
      padding-bottom: ${spacing(2)};
      padding-top: ${spacing(2)};
      width: 100%;
    `,
    mediumUp: () => `
      flex-direction: row;
      width: ${supportCount === 1 ? "100%" : config.mediumBpWidth};

      a {
        display: block;
        height: 100%;
      }
    `,
    wideUp: () => `
      width: ${supportCount === 0 ? config.wideBpWidth : "100%"};
    `
  });
  Container.displayName = "Container";
  return Container;
};

export const getOpinionContainer = ({ hasSupports, supportCount }) => {
  const OpinionContainer = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-grow: 1;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      width: ${hasSupports ? "auto" : "100%"};
    `,
    mediumUp: () => {
      const withoutSupportsStyle = `
        flex-grow: 0;
        padding-left: 0;
        padding-right: 0;
      `;
      const withSupportsStyle = `
        flex-basis: 0 !important;
        flex-grow: ${supportCount === 1 ? "3" : "1"};
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
      `;
      const twoSupportStyle = `
        border-bottom-color: ${colours.functional.keyline};
        border-bottom-style: solid;
        border-bottom-width: 1px;
        margin-bottom: ${spacing(2)};
        min-width: 100%;
        padding-bottom: ${spacing(2)};
        padding-left: 0;
        padding-right: 0;
      `;
      return `
        ${hasSupports ? withSupportsStyle : withoutSupportsStyle}
        ${supportCount === 2 ? twoSupportStyle : ``}
        a > div, a > div > div {
          height: 100%;
        }
      `;
    },
    wideUp: () => `
      border-bottom: none;
      margin-bottom: 0;
      min-width: auto;
      padding-bottom: 0;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
    `
  });
  OpinionContainer.displayName = "OpinionContainer";
  return OpinionContainer;
};

export const getSeparator = ({ itemCount }) => {
  const Separator = withResponsiveStyles(View, {
    base: () => `
      border-bottom-color: ${colours.functional.keyline};
      border-bottom-style: solid;
      border-bottom-width: 1px;
      flex: 1;
      margin-bottom: ${spacing(2)};
      margin-top: ${spacing(2)};
      min-width: auto;
    `,
    mediumUp: () => `
      border-bottom: none;  
      border-right-color: ${colours.functional.keyline};
      border-right-style: solid;
      border-right-width: 1px;
      display: ${itemCount === 3 ? "none" : "block"};
      flex: 0 !important;
      margin: 0;
    `,
    wideUp: () => `
      display: block;
    `
  });
  Separator.displayName = "Separator";
  return Separator;
};

export const getSupportsContainer = ({ supportCount }) => {
  const SupportsContainer = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-direction: column;
      height: auto;
    `,
    mediumUp: () => {
      const twoSupportStyle = `
        min-width: 100%;
      `;
      return `
        flex-basis: 0 !important;
        flex-direction: row;
        ${supportCount === 2 ? twoSupportStyle : ``};
      `;
    },
    wideUp: () => `
      min-width: ${supportCount === 1 ? "400px" : "auto"};
    `
  });
  SupportsContainer.displayName = "SupportsContainer";
  return SupportsContainer;
};

export const getSupportContainer = ({ index, supportCount }) => {
  const SupportContainer = withResponsiveStyles(View, {
    base: () => {
      const secondSupportStyle = `
        border-top-color: ${colours.functional.keyline};
        border-top-style: solid;
        border-top-width: 1px;
        margin-top: ${spacing(2)};
        padding-top: ${spacing(2)};
      `;

      return `
        flex: 1;
        flex-wrap: wrap;
        min-height: auto;
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
        ${index === 1 ? secondSupportStyle : ``}
      `;
    },
    mediumUp: () => {
      const firstSupportStyle = `
        padding-left: ${supportCount === 2 ? `0` : `${spacing(2)}`};
      `;

      const secondSupportStyle = `
        border-left-color: ${colours.functional.keyline};
        border-left-style: solid;
        border-left-width: 1px;
        border-top: none;
        margin-left: ${spacing(2)};
        margin-top: 0;
        padding-right: ${supportCount === 2 ? `0` : `${spacing(2)}`};
        padding-top: 0;
      `;
      const oneSupportStyle = `
        max-width: 100%;
        padding-right: ${spacing(2)};
      `;
      const twoSupportStyle = `
        max-width: 50%;
      `;
      return `
        flex-basis: 0 !important;
        padding-right: 0;
        ${index === 1 ? secondSupportStyle : firstSupportStyle}
        ${supportCount === 2 ? twoSupportStyle : oneSupportStyle}
      `;
    },
    wideUp: () => {
      const paddingRightStyle = `
        padding-right: ${spacing(2)};
      `;
      return `
        padding-left: ${spacing(2)};
        ${index === 1 ? paddingRightStyle : ``}
        ${supportCount === 1 ? paddingRightStyle : ``}
      `;
    }
  });
  SupportContainer.displayName = "SupportContainer";
  return SupportContainer;
};
