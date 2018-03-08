import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export default {
  contentContainerClass: "defaultSliceContentContainerClass",
  headlineClass: "defaultSliceHeadlineClass",
  imageContainerClass: "defaultSliceImageContainerClass",
  summaryClass: "defaultSliceSummaryClass"
};

export const getConfigWrapper = ({ itemCount }) =>
  withResponsiveStyles(View, {
    base: () => `
    .defaultSliceImageContainerClass {
      display: ${itemCount >= 3 ? "none" : "block"};
    }
  `,
    mediumUp: () => {
      const singleDefaultImageStyle = `
      flex: 2;
      min-width: auto;
      max-width: 328px;
      padding-right: 15px;
    `;
      const singleDefaultSummaryStyle = `
      flex-grow: 2.7;
      flex-basis: 0 !important;
      min-width: 325px;
    `;
      return `
      .defaultSliceImageContainerClass {
        display: block;
        ${itemCount === 1 ? singleDefaultImageStyle : ``}
      }

      .defaultSliceContentContainerClass {
        ${itemCount === 1 ? singleDefaultSummaryStyle : ``}
      }

      .defaultSliceHeadlineClass {
        font-size: 30px;
        line-height: 30px;
      }
    `;
    }
  });
