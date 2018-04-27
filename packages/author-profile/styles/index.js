import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";

// from author-profile-pagination.js

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  itemContainer: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  spacing: {
    flex: 1,
    maxWidth: 800
  }
});

export default styles;
