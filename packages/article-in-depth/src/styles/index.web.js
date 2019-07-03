import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { spacing, colours } = styleguide();

const styles = StyleSheet.create({
  ...sharedStyles,
  leadAsset: {
    marginBottom: spacing(4)
  },
  metaContainer: {
    paddingVertical: spacing(2)
  }
});

export default styles;
