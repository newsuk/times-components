import { StyleSheet, Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const StyledRelatedArticlesHeading = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: #dbdbdb;
    border-top-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    height: 55px;
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
    display: flex;
    flex-direction: column;
  `,
    mediumUp: () => `
      flex-direction: ${articleCount === 1 ? "row" : ""};
  `
  });

export const ResponsiveHeadline = withResponsiveStyles(Text, {
  base: () => `
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 5px;
  `,
  mediumUp: () => `
    font-size: 30px;
    line-height: 30px;
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
        : `display: block;`
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
