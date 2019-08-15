import sharedStylesFactory from "./shared";

export default (dropCapFont, scale) => {
  const sharedStyles = sharedStylesFactory(dropCapFont, scale);

  return {
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      fontStyle: "normal"
    }
  };
};
