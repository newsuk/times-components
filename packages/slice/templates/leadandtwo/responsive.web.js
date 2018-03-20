import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

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

export const getContainer = ({ hasSupports }) => {
  const Container = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      padding-bottom: ${2 * spacing}px;
      padding-top: ${2 * spacing}px;
      height: auto;
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
      padding-left: ${spacing(4)};
      padding-right: ${spacing(4)};
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
        padding-left: ${spacing(4)};
        padding-right: ${spacing(4)};
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

export const getSupportContainer = ({ index }) => {
  const SupportContainer = withResponsiveStyles(View, {
    base: () => {
      const secondSupportStyle = `
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: ${colours.functional.keyline};
        margin-top: ${2 * spacing}px;
        padding-top: ${2 * spacing}px;
      `;

      return `
        padding-left: ${2 * spacing}px;
        padding-right: ${2 * spacing}px;
        ${index > 0 ? secondSupportStyle : ``}
      `;
    },
    mediumUp: () => `
      margin-left: ${2 * spacing}px;
      margin-right: ${2 * spacing}px;
      padding-left: 0;
      padding-right: 0;
    `
  });
  SupportContainer.displayName = "SupportContainer";
  return SupportContainer;
};
