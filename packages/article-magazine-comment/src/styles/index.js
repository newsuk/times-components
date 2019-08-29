import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import nativeStyles from "./native";

const styles = StyleSheet.create({
  ...nativeStyles,
  articleHeadline: {
    ...nativeStyles.articleHeadline,
    marginBottom: spacing(1)
  },
  flags: {
    ...nativeStyles.flags,
    marginTop: spacing(2)
  },
  metaSpacer: {
    marginTop: spacing(2)
  }
});

export default styles;
