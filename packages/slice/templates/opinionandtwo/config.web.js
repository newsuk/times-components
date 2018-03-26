import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const opinionSummaryConfig = {
  1: [125],
  2: [125],
  3: [125, 175]
};

export const getOpinionConfig = ({ itemCount }) => ({
  contentContainerClass: "opinionContentContainerClass",
  headlineClass: "opinionHeadlineClass",
  imageConfig: {
    cropSize: "23",
    imageRatio: 2 / 3
  },
  imageContainerClass: "opinionImageContainerClass",
  isOpinionByline: true,
  isReversed: true,
  summaryClass: "opinionSummaryClass",
  summaryConfig: {
    lengths: opinionSummaryConfig[itemCount],
    type: "opinion"
  }
});

export const getSupportConfig = () => ({
  contentContainerClass: "supportContentContainerClass",
  headlineClass: "supportHeadlineClass",
  imageContainerClass: "supportImageContainerClass",
  summaryClass: "supportSummaryClass"
});

export const getConfigWrapper = ({ supportCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
      .opinionImageContainerClass {
        bottom: 0;
        margin-bottom: -10px;
        min-width: 113px;
        position: absolute;
        right: 0;
      }

      .supportImageContainerClass {
        display: none;
      }

      .supportSummaryClass {
        display: none;
      }

      .summaryHidden {
        display: none;
      }

      .opinionSummary125Class {
        display: block;
        width: 60%;
      }
    `,
    mediumUp: () => {
      const getOpinionImageStyle = () => {
        if (supportCount === 0)
          return `
          min-width: auto;
        `;
        if (supportCount === 1)
          return `
          min-width: 165px;
        `;
        return `
          min-width: 152px;
        `;
      };

      return `
        .opinionHeadlineClass {
          font-size: 30px;
          line-height: 30px;
        }

        .opinionContentContainerClass {
          min-width: auto;
          padding-right: 54px;
        }

        .opinionImageContainerClass {
          min-width: auto;
          position: relative;
          margin-bottom: -10px;
          max-width: 167px;
          ${getOpinionImageStyle()}
        }

        .opinionSummary125Class {
          display: ${supportCount === 2 ? "none" : "block"};
        }

        .opinionSummary175Class {
          display: ${supportCount === 2 ? "block" : "none"};
        }

        .supportImageContainerClass {
          display: block;
        }
      `;
    },
    wideUp: () => {
      const getOpinionImageStyle = () => {
        if (supportCount === 0) return ``;
        if (supportCount === 1)
          return `
          min-width: 226px;
        `;
        return `
          min-width: 177px;
        `;
      };

      return `
        .opinionImageContainerClass {
          ${getOpinionImageStyle()}
        }
      `;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
