import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const summaryConfig = {
  1: {
    base: 125
  },
  2: {
    base: 105
  },
  3: {
    base: 105,
    wide: 175,
    huge: 125 
  }
};

export const leadConfig = {
  contentContainerClass: "leadSliceContentContainerClass",
  headlineClass: "leadSliceHeadlineClass",
  imageContainerClass: "leadSliceImageContainerClass",
  summaryClass: "leadSliceSummaryClass",
  ...summaryConfig
};

export const supportConfig = {
  contentContainerClass: "supportSliceContentContainerClass",
  headlineClass: "supportSliceHeadlineClass",
  imageContainerClass: "supportSliceImageContainerClass",
  summaryClass: "supportSliceSummaryClass",
  ...summaryConfig
};

export const getConfigWrapper = ({ supportCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
      .supportSliceImageContainerClass {
        display: none;
      }
      .supportSliceSummaryClass {
        display: none;
      }
    `,
    mediumUp: () => {
      const leadAndTwoSliceImageWithSupportsStyle = `
        margin-bottom: 10px;
        min-width: 270px;
      `;

      return `
        .leadAndTwoSliceHeadlineClass {
          font-size: 30px;
          line-height: 30px;
        }

        .leadAndTwoSliceImageContainerClass {
          flex: 2;
          margin-bottom: 0;
          min-width: auto;
          padding-right: 10px;
          ${supportCount === 2 ? leadAndTwoSliceImageWithSupportsStyle : ``}
        }

        .leadAndTwoSliceContentContainerClass {
          flex-grow: 2.7;
          flex-basis: 0 !important;
          min-width: ${supportCount === 2 ? "300px" : "325px"};
        }

        .supportSliceImageContainerClass {
          display: block;
        }
      `;
    },
    wideUp: () => {
      const doubleSupportImageStyle = `
        flex: 2;
        margin-bottom: 0;
        max-width: 180px;
        min-width: auto;
        padding-right: 10px;
      `;

      const doubleSupportContentStyle = `
        flex: 2.7;
        flex-basis: 0 !important;
        min-width: 250px;
      `;

      return `
        .supportSliceImageContainerClass {
          ${supportCount === 2 ? doubleSupportImageStyle : ``}
        }

        .supportSliceContentContainerClass {
          ${supportCount === 2 ? doubleSupportContentStyle : ``}
        }
      `;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
