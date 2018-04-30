import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listingErrorContainer: {
    alignSelf: "center",
    flexBasis: "50%",
    maxWidth: 548
  },
  listingErrorButtonContainer: {
    alignSelf: "center",
    maxWidth: 300,
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
    width: 200
  }
});

export default styles;
