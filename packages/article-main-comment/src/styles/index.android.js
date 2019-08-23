import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadline: {
    ...sharedStyles.articleHeadline,
    marginBottom: spacing(2.75)
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
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(4)
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
