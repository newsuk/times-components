import sharedStyles from "./shared";

const nativeStyles = {
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    fontStyle: "normal",
    marginBottom: 20
  })
};

export default Object.assign({}, sharedStyles, nativeStyles);
