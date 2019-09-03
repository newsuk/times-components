import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import nativeStyles from "./native";

const androidStyles = {
  ...nativeStyles,
  flags: {
    ...nativeStyles.flags,
    marginTop: spacing(2)
  },
  metaTablet: {
    ...nativeStyles.metaTablet,
    paddingTop: "auto"
  }
};

const styles = StyleSheet.create({
  ...androidStyles
});

export default styles;
