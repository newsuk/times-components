import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listItemContainer: {
    paddingBottom: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(3)
  },
  listItemSeparatorContainer: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  pageErrorContainer: {
    flex: 1,
    margin: spacing(2)
  },
  pageErrorImageContainer: {
    alignSelf: "center",
    marginBottom: spacing(4),
    marginTop: spacing(4),
    width: "60%"
  },
  listErrorContainer: {
    flex: 1,
    margin: spacing(3)
  }
});

export default styles;
