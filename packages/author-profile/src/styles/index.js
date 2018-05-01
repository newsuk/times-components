import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  pageErrorContainer: {
    flex: 1,
    margin: spacing(2)
  },
  pageErrorImageContainer: {
    alignSelf: "center",
    marginBottom: spacing(4),
    marginTop: spacing(4),
    width: "60%"
  }
});

export default styles;
