import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 9,
    paddingBottom: spacing(1)
  }
});

export default styles;
