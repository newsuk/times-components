import { StyleSheet, Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const Heading = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: ${colours.functional.keyline};
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
Heading.displayName = "Heading";

export const getRelatedArticleContainer = ({ articleCount }) => {
  const RelatedArticleContainer = withResponsiveStyles(View, {
    base: () => `
    display: flex;
    flex-direction: column;
  `,
    mediumUp: () => `
      flex-direction: ${articleCount === 1 ? "row" : "column"};
  `
  });
  RelatedArticleContainer.displayName = "RelatedArticleContainer";
  return RelatedArticleContainer;
};

export const getHeadlineContainer = ({ isSupport }) => {
  const smallStyles = `
    font-size: 22px;
    line-height: 22px;
  `;
  const largeStyles = `
    font-size: 30px;
    line-height: 30px;
  `;
  const HeadlineContainer = withResponsiveStyles(Text, {
    base: () => `
      ${smallStyles}
      margin-bottom: 5px;
    `,
    mediumUp: () => `
      ${isSupport ? smallStyles : largeStyles}
    `
  });
  HeadlineContainer.displayName = "HeadlineContainer";
  return HeadlineContainer;
};

export const getImageContainer = ({
  articleCount,
  hasManyDefaults,
  isSupport
}) => {
  const ImageContainer = withResponsiveStyles(View, {
    base: () => `
    display: ${hasManyDefaults || isSupport ? "none" : "block"};
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
  ImageContainer.displayName = "ImageContainer";
  return ImageContainer;
};

export const getSummaryContainer = ({ articleCount }) => {
  const SummaryContainer = withResponsiveStyles(View, {
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
  SummaryContainer.displayName = "SummaryContainer";
  return SummaryContainer;
};
