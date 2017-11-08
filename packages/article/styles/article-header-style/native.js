import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
    fontWeight: "700"
  }),
  standFirst: Object.assign({}, sharedStyles.standFirst, {
    lineHeight: 25
  })
};

export default nativeStyles;
