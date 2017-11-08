import sharedStyles from "./shared";

const webStyles = {
  ...sharedStyles,
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    marginTop: 0
  })
};

export default webStyles;
