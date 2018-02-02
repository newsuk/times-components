import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const RelatedArticleContainer = articleCount =>
  withResponsiveStyles(View, {
    base: () => `
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    padding-top: 10px;
  `,
    mediumUp: () =>
      articleCount === 1
        ? `
    flex-direction: row;
  `
        : ``
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
