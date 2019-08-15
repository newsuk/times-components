import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadline: {
    ...sharedStyles.articleHeadline,
    lineHeight: sharedStyles.articleHeadline.fontSize,
    marginBottom: spacing(4)
  },
  authorImage: {
    ...sharedStyles.authorImage,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  },
  datePublication: {
    ...sharedStyles.datePublication,
    lineHeight: sharedStyles.datePublication.fontSize
  },
  header: {
    ...sharedStyles.header,
    marginBottom: spacing(0)
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
