import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const summaryConfig = {
  1: [125],
  2: [125],
  3: [125, 145]
};

export const getConfig = itemCount => ({
  contentContainerClass: "contentContainerClass",
  headlineClass: "headlineClass",
  imageContainerClass: "imageContainerClass",
  summaryClass: "summaryClass",
  summaryConfig: {
    lengths: summaryConfig[itemCount]
  }
});

export const getConfigWrapper = ({ itemCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
      .summaryHidden {
        display: none;
      }
      .summary125Class {
        display: block;
      }
      .imageContainerClass {
        display: ${itemCount >= 3 ? "none" : "block"};
      }
    `,
    mediumUp: () => {
      const singleItemImageStyle = `
        flex: 2;
        min-width: auto;
        max-width: 328px;
        padding-right: 15px;
      `;

      const singleItemSummaryStyle = `
        flex-grow: 2.7;
        flex-basis: 0 !important;
        min-width: 325px;
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
