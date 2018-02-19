import { StyleSheet } from "react-native";

export const RelatedArticleContainer = ({ articleCount }) => ({
  base: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => `
      border: 0;
      flex-direction: ${articleCount === 1 ? "row" : ""};
      padding-left: 0;
      padding-right: 0;
  `
});

export const Headline = () => ({
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

export const ImageContainer = ({ articleCount }) => ({
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

export const SummaryContainer = ({ articleCount }) => ({
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
