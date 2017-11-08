import sharedStyles from "./shared";

const nativeStyles = {
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    marginBottom: 20
  })
};

export default Object.assign({}, sharedStyles, nativeStyles);
