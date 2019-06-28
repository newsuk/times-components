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
    alignItems: "center",
    marginHorizontal: spacing(2),
    paddingVertical: spacing(2),
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1
  }
});

export default styles;
