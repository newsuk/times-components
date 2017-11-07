import sharedStyles from "./shared";

const webStyles = {
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    marginTop: 0
  })
};

export default Object.assign({}, sharedStyles, webStyles);
