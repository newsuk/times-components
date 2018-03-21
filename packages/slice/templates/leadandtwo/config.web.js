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
        min-width: 370px;
      `;

      const withoutSupportsImageStyle = `
        padding-right: 10px;
      `;

      return `
        .leadHeadlineClass {
          font-size: 30px;
          line-height: 30px;
        }

        .leadImageContainerClass {
          flex: 1;
          margin-bottom: 0;
          min-width: auto;
          ${
            supportCount === 2
              ? withSupportsImageStyle
              : withoutSupportsImageStyle
          }
        }

        .leadContentContainerClass {
          flex-grow: 1;
          flex-basis: 0 !important;
          min-width: 300px;
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
      const twoLeadImageStyle = `
        min-width: auto;
      `;

      const twoSupportImageStyle = `
        flex: 1;
        margin-bottom: 0;
        max-width: 185px;
        min-width: auto;
        padding-right: 10px;
      `;

      const twoSupportContentStyle = `
        flex: 1;
        min-width: 100px;
      `;

      return `
        .leadImageContainerClass {
          padding-right: 10px;
          ${supportCount === 2 ? twoLeadImageStyle : ``}
        }

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
