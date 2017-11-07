import sharedStyles from "./shared";

const nativeStyles = {
  articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
    fontWeight: "700"
  }),
  standFirst: Object.assign({}, sharedStyles.standFirst, {
    lineHeight: 25
  })
};

export default Object.assign({}, sharedStyles, nativeStyles);
