import styleguide from "@times-components/styleguide";
import sharedStylesFactory from "./shared";

export default (dropCapFont, scale) => {
  const { spacing } = styleguide({ scale });
  const sharedStyles = sharedStylesFactory(dropCapFont, scale);

  return {
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      fontStyle: "normal",
      marginBottom: spacing(4)
    }
  };
};
