import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";

export const SectionsContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    flex-direction: column;
    height: auto;
  `
});
SectionsContainer.displayName = "SectionsContainer";

export const getSectionContainer = index =>
  withResponsiveStyles(View, {
    base: () => {
      const firstChildStyle = `
        padding-bottom: 0;
      `;

      const secondChildStyle = `
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
        ${index === 0 ? firstChildStyle : secondChildStyle}
      `;
    },
    mediumUp: () => `
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 0;
      padding-right: 0;
    `
  });

export const getContainer = ({ hasSections }) =>
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
      const withoutSectionsStyle = `
      padding-left: 0px;
      padding-right: 0px;
      width: ${config.mediumBpWidth};
    `;

      const withSectionsStyle = `
      width: 100%;
    `;

      return `
      flex-direction: row;
      ${hasSections ? withSectionsStyle : withoutSectionsStyle}
    `;
    },
    wideUp: () => `
    width: ${hasSections ? "100%" : config.wideBpWidth};
  `
  });

export const getLeadContainer = ({ hasSections }) =>
  withResponsiveStyles(View, {
    base: () => `
    flex: 1;
    flex-grow: 1;
    padding-left: 10px;
    padding-right: 10px;
    width: ${hasSections ? "auto" : "100%"};
  `,
    mediumUp: () => {
      const withoutSectionsStyle = `
      flex-grow: 0;
      padding-left: 0;
      padding-right: 0;
    `;
      const withSectionsStyle = `
      flex-grow: 3;
      padding-left: 10px;
      padding-right: 10px;
    `;
      return `
      ${hasSections ? withSectionsStyle : withoutSectionsStyle}
    `;
    }
  });
