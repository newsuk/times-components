import { StyleSheet } from "react-native";
import { colours, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  listItemContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  }
});

export default styles;
