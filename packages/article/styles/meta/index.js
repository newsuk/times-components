import { StyleSheet } from "react-native";
import globalStyle from "../article-global-style";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 9,
    paddingBottom: 5
  },
  ...globalStyle
});

export default styles;
