import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const shared = sharedStyles();

const styles = () =>
  StyleSheet.create({
    ...shared,
    container: {
      ...shared.container,
      marginBottom: spacing(3)
    }
  });

export default styles;
