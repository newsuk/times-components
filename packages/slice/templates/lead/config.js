import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const leadConfig = {
  contentContainerClass: "leadSliceContentContainerClass",
  headlineClass: "leadSliceHeadlineClass",
  imageContainerClass: "leadSliceImageContainerClass",
  summaryClass: "leadSliceSummaryClass"
};

export const supportConfig = {
  contentContainerClass: "supportSliceContentContainerClass",
  headlineClass: "supportSliceHeadlineClass",
  imageContainerClass: "supportSliceImageContainerClass",
  summaryClass: "supportSliceSummaryClass"
};

export const ConfigWrapper = withResponsiveStyles(View, {
  base: () => `
    .supportSliceImageContainerClass {
      display: none;
    }
    .supportSliceSummaryClass {
      display: none;
    }
  `,
  mediumUp: () => `
    .leadSliceHeadlineClass {
      font-size: 30px;
      line-height: 30px;
    }

    .leadSliceImageContainerClass {
      flex: 2;
      min-width: auto;
      max-width: 328px;
      padding-right: 15px;
    }

    .leadSliceContentContainerClass {
      flex-grow: 2.7;
      flex-basis: 0 !important;
      min-width: 325px;
    }

    .supportSliceImageContainerClass {
      display: block;
    }
  `
});
ConfigWrapper.displayName = "ConfigWrapper";
