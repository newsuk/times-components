import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const summaryConfig = {
  1: [125],
  2: [125],
  3: [125, 145]
};

export default {
  contentContainerClass: "defaultSliceContentContainerClass",
  headlineClass: "defaultSliceHeadlineClass",
  imageContainerClass: "defaultSliceImageContainerClass",
  summaryClass: "defaultSliceSummaryClass"
};

export const getConfigWrapper = ({ itemCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
    .summaryHidden {
      display: none;
    }
    .summary125Class {
      display: block;
    }
    .standardSliceImageContainerClass {
      display: ${itemCount >= 3 ? "none" : "block"};
    }
  `,
    mediumUp: () => {
      const singleStandardImageStyle = `
      flex: 2;
      min-width: auto;
      max-width: 328px;
      padding-right: 15px;
    `;
      const singleStandardSummaryStyle = `
      flex-grow: 2.7;
      flex-basis: 0 !important;
      min-width: 325px;
    `;
      return `
      .standardSliceImageContainerClass {
        display: block;
        ${itemCount === 1 ? singleStandardImageStyle : ``}
      }

      .standardSliceContentContainerClass {
        ${itemCount === 1 ? singleStandardSummaryStyle : ``}
      }

      .standardSliceHeadlineClass {
        font-size: 30px;
        line-height: 30px;
      }
    `;
    },
    wideUp: () => {
      return `
      .summary125Class {
        display: ${itemCount === 3 ? "none" : "block"};
      }
      .summary145Class {
        display: ${itemCount === 3 ? "block" : "none"};
      }
    `;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
