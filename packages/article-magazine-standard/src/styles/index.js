import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import nativeStyles from "./native";

const styles = StyleSheet.create({
  ...nativeStyles,
  flags: {
    ...nativeStyles.flags,
    marginTop: spacing(2)
  },
  metaTablet: {
    ...nativeStyles.metaTablet,
    paddingTop: "auto"
  }
});

export default styles;
