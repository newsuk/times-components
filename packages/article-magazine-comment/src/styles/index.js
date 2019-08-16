import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import nativeStyles from "./native";

const styles = StyleSheet.create({
  ...nativeStyles,
  articleHeadline: {
    ...nativeStyles.articleHeadline,
    lineHeight: nativeStyles.articleHeadline.fontSize
  },
  metaTablet: {
    ...nativeStyles.metaTablet,
    paddingTop: "auto"
  },
  standFirst: {
    ...nativeStyles.standFirst,
    marginBottom: spacing(2.5)
  },
  datePublication: {
    ...nativeStyles.datePublication,
    lineHeight: nativeStyles.datePublication.fontSize
  }
});

export default styles;
