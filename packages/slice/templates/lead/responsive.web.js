import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";

export const SupportsContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    height: auto;
  `
});
SupportsContainer.displayName = "SupportsContainer";

export const getSupportContainer = ({ index }) => {
  const SupportContainer = withResponsiveStyles(View, {
    base: () => {
      const firstSupportStyle = `
        padding-bottom: 0;
      `;

      const secondSupportStyle = `
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #dbdbdb;
        margin-top: 10px;
        padding-top: 10px;
      `;

      return `
        flex: 1;
        flex-wrap: wrap;
        min-height: auto;
        padding-left: 10px;
        padding-right: 10px;
        ${index === 0 ? firstSupportStyle : secondSupportStyle}
      `;
    },
    mediumUp: () => `
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 0;
      padding-right: 0;
    `
  });
  SupportContainer.displayName = "SupportContainer";
  return SupportContainer;
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

export const getLeadContainer = ({ hasSupports }) => {
  const LeadContainer = withResponsiveStyles(View, {
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
      flex-grow: 3;
      padding-left: 10px;
      padding-right: 10px;
    `;
      return `
      ${hasSupports ? withSupportsStyle : withoutSupportsStyle}
    `;
    }
  });
  LeadContainer.displayName = "LeadContainer";
  return LeadContainer;
};
