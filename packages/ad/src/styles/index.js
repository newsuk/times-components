import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import baseStyles from "./index.shared";

export default StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    marginBottom: spacing(4)
  }
});

export { calculateViewBox, calculateViewportVisible } from "./index.shared";
