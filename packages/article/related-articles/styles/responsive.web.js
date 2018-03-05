import { StyleSheet, Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const Heading = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: ${colours.functional.alto};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: ${colours.functional.alto};
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

// replace with Card
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
ResponsiveHeadline.displayName = "ResponsiveHeadline";

export const getImageContainer = ({ articleCount, index, template }) => {
  const ImageContainer = withResponsiveStyles(View, {
    base: () => `
    display: ${
      (template === "DEFAULT" && articleCount === 3) ||
      (template === "LEAD_AND_TWO" && index > 0)
        ? "none"
        : "block"
    };
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
