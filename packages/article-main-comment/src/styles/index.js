import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadline: {
    ...sharedStyles.articleHeadline,
    marginBottom: spacing(2.5)
  },
  authorImage: {
    ...sharedStyles.authorImage,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100
  },
  metaFlagSpacer: {
    marginTop: spacing(1)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(1)
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
