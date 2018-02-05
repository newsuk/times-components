import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const StyledRelatedArticlesHeading = withResponsiveStyles(View, {
  base: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: #dbdbdb;
    border-top-width: ${StyleSheet.hairlineWidth}px;
    height: 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
  `,
  mediumUp: () => `
      margin-left: 0;
      margin-right: 0;
  `
});

export const RelatedArticleContainer = articleCount =>
  withResponsiveStyles(View, {
    base: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
  `,
    mediumUp: () => `
      border: 0;
      flex-direction: ${articleCount === 1 ? "row" : ""};
      padding-left: 0;
      padding-right: 0;
  `
  });

export const ImageContainer = articleCount =>
  withResponsiveStyles(View, {
    base: () => `
    display: ${articleCount === 3 ? "none" : "block"};
    flex-grow: 1;
    margin-bottom: 10px;
  `,
    mediumUp: () =>
      articleCount === 1
        ? `
    flex-grow: 2;
    flex-basis: 0;
    margin-bottom: 0;
  `
        : ``
  });

export const SummaryContainer = articleCount =>
  withResponsiveStyles(View, {
    base: () => `
    flex-grow: 1;
  `,
    mediumUp: () =>
      articleCount === 1
        ? `
    padding-left: 15px;
    flex-grow: 2.7;
    flex-basis: 0 !important;
  `
        : ``
  });
