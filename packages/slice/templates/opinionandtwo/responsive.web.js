import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const getSeparator = ({ itemCount }) => {
  const Separator = withResponsiveStyles(View, {
    base: () => `
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: ${colours.functional.keyline};
      flex: 1;
      margin-bottom: 10px;
      margin-top: 10px;
      min-width: auto;
    `,
    mediumUp: () => `
      border-bottom: none;  
      border-right-style: solid;
      border-right-width: 1px;
      border-right-color: ${colours.functional.keyline};
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

export const getContainer = ({ hasSupports }) => {
  const Container = withResponsiveStyles(View, {
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
      const withoutSupportsStyle = `
        padding-left: 0px;
        padding-right: 0px;
        width: ${config.mediumBpWidth};
      `;

      const withSupportsStyle = `
        width: 100%;
      `;

      return `
        flex-direction: row;
        ${hasSupports ? withSupportsStyle : withoutSupportsStyle}
      `;
    },
    wideUp: () => `
      width: ${hasSupports ? "100%" : config.wideBpWidth};
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
      padding-left: 10px;
      padding-right: 10px;
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
        flex-grow: ${supportCount === 1 ? "3" : "2"};
        padding-left: 10px;
        padding-right: 10px;
      `;
      const twoSupportStyle = `
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: ${colours.functional.keyline};
        padding-bottom: 10px;
        margin-bottom: 10px;
        min-width: 100%;
      `;
      return `
        ${hasSupports ? withSupportsStyle : withoutSupportsStyle}
        ${supportCount === 2 ? twoSupportStyle : ``}
      `;
    },
    wideUp: () => {
      const getFlexGrow = () => {
        if (supportCount === 0) return "1.5";
        if (supportCount === 1) return "2.75";
        return "2";
      };
      return `
        border-bottom: none;
        flex-grow: ${getFlexGrow()};
        padding-bottom: 0;
        margin-bottom: 0;
        min-width: auto;
      `;
    }
  });
  OpinionContainer.displayName = "OpinionContainer";
  return OpinionContainer;
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
        flex-direction: row;
        min-width: 100%;
      `;
      return `
        flex-basis: 0 !important;
        ${supportCount === 2 ? twoSupportStyle : ``};
      `;
    },
    wideUp: () => `
      flex-grow: ${supportCount === 2 ? "2" : "1"};
      min-width: auto;
    `
  });
  SupportsContainer.displayName = "SupportsContainer";
  return SupportsContainer;
};

export const getSupportContainer = ({ index, supportCount }) => {
  const SupportContainer = withResponsiveStyles(View, {
    base: () => {
      const secondSupportStyle = `
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: ${colours.functional.keyline};
        margin-top: 10px;
        padding-top: 10px;
      `;

      return `
        flex: 1;
        flex-wrap: wrap;
        min-height: auto;
        padding-left: 10px;
        padding-right: 10px;
        ${index === 1 ? secondSupportStyle : ``}
      `;
    },
    mediumUp: () => {
      const secondSupportStyle = `
        border-left-style: solid;
        border-left-width: 1px;
        border-left-color: ${colours.functional.keyline};
        border-top: none;
        margin-left: 10px;
        margin-top: 0;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 0;
      `;
      const oneSupportStyle = `
        max-width: 100%;
        padding-right: 10px;
      `;
      const twoSupportStyle = `
        max-width: 50%;
      `;
      return `
        padding-right: 0;
        ${index === 1 ? secondSupportStyle : ``}
        ${supportCount === 2 ? twoSupportStyle : oneSupportStyle}
      `;
    }
  });
  SupportContainer.displayName = "SupportContainer";
  return SupportContainer;
};
