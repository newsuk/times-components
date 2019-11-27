import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import nativeStyles from "./native";

const appStyles = {
  ...nativeStyles,
  articleHeadline: {
    ...nativeStyles.articleHeadline,
    marginBottom: spacing(3)
  },
  metaTablet: {
    ...nativeStyles.metaTablet,
    paddingTop: "auto"
  },
  standFirst: {
    ...nativeStyles.standFirst,
    marginBottom: spacing(2.5)
  },
  label: {
    marginBottom: 0
  }
};

const styles = StyleSheet.create({
  ...appStyles
});

export default styles;
