import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const getContainer = ({ hasSupports }) => {
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
    mediumUp: () => {
      const noSupportsStyle = `
        padding-left: 0px;
        padding-right: 0px;
        width: ${config.mediumBpWidth};
      `;

      const hasSupportsStyle = `
        width: 100%;
      `;

      return `
        flex-direction: row;
        padding-bottom: ${spacing(2)};
        ${hasSupports ? hasSupportsStyle : noSupportsStyle}
      `;
    },
    wideUp: () => `
      width: ${hasSupports ? "100%" : config.wideBpWidth};
    `
  });
  Container.displayName = "Container";
  return Container;
};

export const getLeadContainer = ({ hasSupports, supportCount }) => {
  const LeadContainer = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-grow: 1;
      padding-bottom: 0;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      width: ${hasSupports ? "auto" : "100%"};
    `,
    mediumUp: () => {
      const noSupportsStyle = `
        flex-grow: 0;
        padding-left: 0;
        padding-right: 0;
      `;
      const hasSupportsStyle = `
        flex-basis: 0 !important;
        flex-grow: ${supportCount === 1 ? "3" : "2"};
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
      `;
      return `
        ${hasSupports ? hasSupportsStyle : noSupportsStyle}
      `;
    },
    wideUp: () => `
      flex-grow: ${supportCount === 1 ? "2.75" : "1.5"};
    `
  });
  LeadContainer.displayName = "LeadContainer";
  return LeadContainer;
};

export const SupportsContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    height: auto;
  `,
  mediumUp: () => `
    flex-basis: 0 !important;
  `
});
SupportsContainer.displayName = "SupportsContainer";

export const getSupportContainer = ({ index }) => {
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
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
        ${index > 0 ? secondSupportStyle : ``}
      `;
    },
    mediumUp: () => `
      margin-left: ${spacing(2)};
      margin-right: ${spacing(2)};
      padding-left: 0;
      padding-right: 0;
    `,
    wideUp: () => `
      margin-top: ${index > 0 ? spacing(2) : "0"};
    `
  });
  SupportContainer.displayName = "SupportContainer";
  return SupportContainer;
};
