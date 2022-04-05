import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { spacing } = styleguide();

const styles = StyleSheet.create({
  ...sharedStyles,
  leadAsset: {
    marginBottom: spacing(4)
  },
  metaContainer: {
    justifyContent: "center",
    paddingVertical: spacing(2)
  }
});

export default styles;
