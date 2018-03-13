import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export default {
  contentContainerClass: "standardSliceContentContainerClass",
  headlineClass: "standardSliceHeadlineClass",
  imageContainerClass: "standardSliceImageContainerClass",
  summaryClass: "standardSliceSummaryClass"
};

export const getConfigWrapper = ({ itemCount }) =>
  withResponsiveStyles(View, {
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
