import { StyleSheet } from "react-native";
import globalStyle from "../article-global-style";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 6,
    paddingBottom: 8
  },
  ...globalStyle
});

export default styles;
