import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

const opinionSummaryConfig = {
  1: [125, 160],
  2: [125, 145, 225],
  3: [125, 160]
};

export const getOpinionConfig = ({ itemCount }) => ({
  bylineClass: "opinionBylineClass",
  contentContainerClass: "opinionContentContainerClass",
  headlineClass: "opinionHeadlineClass",
  imageConfig: {
    cropSize: "23",
    imageRatio: 308 / 502
  },
  imageContainerClass: "opinionImageContainerClass",
  isOpinionByline: true,
  isReversed: true,
  summaryConfig: {
    lengths: opinionSummaryConfig[itemCount],
    type: "opinion"
  }
});

export const getSupportConfig = () => ({
  contentContainerClass: "supportContentContainerClass",
  imageContainerClass: "supportImageContainerClass",
  summaryClass: "supportSummaryClass"
});

export const getConfigWrapper = ({ supportCount }) => {
  const ConfigWrapper = withResponsiveStyles(View, {
    base: () => `
      .opinionContentContainerClass {
        min-height: 250px;
      }
      .opinionImageContainerClass {
        align-self: flex-end;
        bottom: -9px;
        min-width: 100px;
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
        padding-right: ${spacing(4)};
        width: 60%;
      }
    `,
    smallUp: () => {
      const getOpinionImageStyle = () => {
        if (supportCount === 0)
          return `
          min-width: 130px;
        `;
        return `
          min-width: 120px;
        `;
      };
      return `
        .opinionContentContainerClass {
          min-height: 200px;
        }
        .opinionImageContainerClass {
          ${getOpinionImageStyle()}
        }
        .opinionHeadlineClass {
          padding-right: ${spacing(6)};
          width: 80%;
        }
      `;
    },
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

      const getSummaryStyle = () => {
        if (supportCount === 0)
          return `
          .opinionSummary125Class {
            display: none;
          }
          .opinionSummary160Class {
            display: block;
          }
        `;
        if (supportCount === 1)
          return `
          .opinionSummary125Class {
            display: none;
          }
          .opinionSummary145Class {
            display: block;
          }
        `;
        return `
          .opinionSummary125Class {
            display: none;
          }
          .opinionSummary160Class {
            display: block;
          }
        `;
      };

      return `
        .opinionBylineClass,
        .opinionHeadlineClass {
          font-size: 30px;
          line-height: 30px;
          width: 100%;
        }
        .opinionContentContainerClass {
          min-width: auto;
          padding-right: ${spacing(11)};
        }
        .opinionImageContainerClass {
          max-width: 167px;
          min-width: auto;
          position: relative;
          ${getOpinionImageStyle()}
        }

        ${getSummaryStyle()}

        .supportImageContainerClass {
          display: block;
        }
      `;
    },
    wideUp: () => {
      const summaryStyle = `
        .opinionSummary125Class,
        .opinionSummary145Class {
          display: none;
        }
        .opinionSummary225Class {
          display: block;
        }
      `;

      return supportCount === 1 ? summaryStyle : ``;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
