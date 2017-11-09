import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 9,
    paddingBottom: 4
  },
  ...globalStyle
});

export default styles;
