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
    imageRatio: 2 / 3
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
    base: () => {
      const getOpinionImageStyle = () => {
        if (supportCount === 0)
          return `
          margin-bottom: ${spacing(-2)};
        `;
        if (supportCount === 1)
          return `
          margin-bottom: 6px;
        `;
        return `
          margin-bottom: 6px;
        `;
      };
      return `
        .opinionContentContainerClass {
          min-height: 250px;
        }
        .opinionImageContainerClass {
          bottom: 0;
          min-width: 115px;
          position: absolute;
          right: 0;
          ${getOpinionImageStyle()}
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
      `;
    },
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
          min-height: 180px;
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
          margin-bottom: ${spacing(3)};
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
          min-width: auto;
          position: relative;
          margin-bottom: ${spacing(-2)};
          max-width: 167px;
          ${getOpinionImageStyle()}
        }

        ${getSummaryStyle()}

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

      const summaryStyle = `
        .opinionSummary125Class,
        .opinionSummary145Class {
          display: none;
        }
        .opinionSummary225Class {
          display: block;
        }
      `;

      return `
        .opinionImageContainerClass {
          ${getOpinionImageStyle()}
        }

        ${supportCount === 1 ? summaryStyle : ``}
      `;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
