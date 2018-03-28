import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

const summaryConfig = {
  1: [125],
  2: [125],
  3: [125, 145]
};

export const getConfig = ({ itemCount }) => ({
  contentContainerClass: "contentContainerClass",
  headlineClass: "headlineClass",
  imageContainerClass: "imageContainerClass",
  summaryConfig: {
    lengths: summaryConfig[itemCount]
  }
});

export const getConfigWrapper = ({ itemCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
      .imageContainerClass {
        display: ${itemCount >= 3 ? "none" : "block"};
      }
      .summaryHidden {
        display: none;
      }
      .summary125Class {
        display: block;
      }
    `,
    mediumUp: () => {
      const singleItemImageStyle = `
        flex: 1;
        margin-bottom: 0;
        min-width: auto;
        padding-right: ${spacing(2)};
      `;

      const singleItemSummaryStyle = `
        flex-basis: 0 !important;
        flex-grow: 1;
        min-width: 300px;
      `;

      return `
        .imageContainerClass {
          display: block;
          ${itemCount === 1 ? singleItemImageStyle : ``}
        }
        .contentContainerClass {
          ${itemCount === 1 ? singleItemSummaryStyle : ``}
        }
        .headlineClass {
          font-size: 30px;
          line-height: 30px;
        }
      `;
    },
    wideUp: () => `
      .summary125Class {
        display: ${itemCount === 3 ? "none" : "block"};
      }
      .summary145Class {
        display: ${itemCount === 3 ? "block" : "none"};
      }
    `
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
