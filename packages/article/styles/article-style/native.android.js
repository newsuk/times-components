import sharedStyles from "./shared";
import constants from "../const";

const { fontFamilyBody } = constants;

const androidStyles = {
  leadAsset: Object.assign({}, sharedStyles.leadAsset, {
    marginBottom: 6
  }),
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    fontFamily: fontFamilyBody,
    fontSize: 16,
    fontStyle: "normal",
    marginBottom: 20
  })
};

export default Object.assign({}, sharedStyles, androidStyles);
