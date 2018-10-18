import sharedStylesFactory from "./shared";

const sharedStyles = sharedStylesFactory();

export default {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  }
};
