import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const summaryConfig = {
  1: {
    base: 125
  },
  2: {
    base: 125
  },
  3: {
    base: 145,
    wide: 125
  }
};

export default {
  contentContainerClass: "defaultSliceContentContainerClass",
  headlineClass: "defaultSliceHeadlineClass",
  imageContainerClass: "defaultSliceImageContainerClass",
  summaryClass: "defaultSliceSummaryClass",
  ...summaryConfig
};

export const getConfigWrapper = ({ itemCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
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
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
