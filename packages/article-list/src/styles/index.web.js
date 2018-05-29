import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listErrorContainer: {
    alignSelf: "center",
    flexBasis: "50%",
    maxWidth: 548
  },
  listContentContainer: {
    width: "100%"
  },
  listContentErrorContainer: {
    flex: 1,
    margin: spacing(3)
  },
  retryButton: {
    alignSelf: "center",
    paddingBottom: spacing(2),
    paddingTop: spacing(8)
  }
});

export default styles;
