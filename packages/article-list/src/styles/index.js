import { StyleSheet } from "react-native";
import { spacing, tabletWidth } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listItemContainerTablet: {
    paddingVertical: spacing(3)
  },
  listItemSeparator: {
    ...sharedStyles.listItemSeparator,
    flex: 1,
    maxWidth: tabletWidth
  },
  listItemSeparatorContainer: {
    ...sharedStyles.listItemSeparatorContainer,
    flexDirection: "row",
    justifyContent: "center"
  }
});

const watermarkStyles = {
  height: 250,
  width: 300
};

export { watermarkStyles };
export default styles;
