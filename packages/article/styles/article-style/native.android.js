import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import constants from "../const";

const { fontFamilyBody } = constants;

const androidStyles = StyleSheet.create({
  leadAsset: Object.assign({}, sharedStyles.leadAsset, {
    marginBottom: 6
  }),
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    fontFamily: fontFamilyBody,
    fontSize: 16,
    fontStyle: "normal",
    marginBottom: 20
  })
});

export default Object.assign({}, sharedStyles, androidStyles);
