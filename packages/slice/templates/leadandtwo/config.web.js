import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const leadSummaryConfig = {
  1: [125],
  2: [125],
  3: [125, 175]
};

export const getLeadConfig = itemCount => ({
  contentContainerClass: "leadContentContainerClass",
  headlineClass: "leadHeadlineClass",
  imageContainerClass: "leadImageContainerClass",
  summaryClass: "leadSummaryClass",
  summaryConfig: {
    lengths: leadSummaryConfig[itemCount],
    type: "lead"
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
      .supportImageContainerClass {
        display: none;
      }
      .supportSummaryClass {
        display: none;
      }
      .summaryHidden {
        display: none;
      }
      .leadSummary125Class {
        display: block;
      }
    `,
    mediumUp: () => {
      const withSupportsImageStyle = `
        margin-bottom: 10px;
        min-width: 270px;
      `;

      return `
        .leadHeadlineClass {
          font-size: 30px;
          line-height: 30px;
        }

        .leadImageContainerClass {
          flex: 2;
          margin-bottom: 0;
          min-width: auto;
          padding-right: 10px;
          ${supportCount === 2 ? withSupportsImageStyle : ``}
        }

        .leadContentContainerClass {
          flex-grow: 2.7;
          flex-basis: 0 !important;
          min-width: ${supportCount === 2 ? "300px" : "325px"};
        }

        .supportImageContainerClass {
          display: block;
        }

        .leadSummary125Class {
          display: ${supportCount === 2 ? "none" : "block"};
        }

        .leadSummary175Class {
          display: ${supportCount === 2 ? "block" : "none"};
        }
      `;
    },
    wideUp: () => {
      const twoSupportImageStyle = `
        flex: 2;
        margin-bottom: 0;
        max-width: 180px;
        min-width: auto;
        padding-right: 10px;
      `;

      const twoSupportContentStyle = `
        flex: 2.7;
        flex-basis: 0 !important;
        min-width: 250px;
      `;

      return `
        .supportImageContainerClass {
          ${supportCount === 2 ? twoSupportImageStyle : ``}
        }

        .supportContentContainerClass {
          ${supportCount === 2 ? twoSupportContentStyle : ``}
        }
      `;
    }
  });
  ConfigWrapper.displayName = "ConfigWrapper";
  return ConfigWrapper;
};
