import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    marginBottom: 20
  })
};

export default nativeStyles;
