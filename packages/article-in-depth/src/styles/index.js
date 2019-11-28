import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: spacing(9)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25,
    marginBottom: 0
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(4)
  },
  datePublication: {
    ...sharedStyles.datePublication,
    marginTop: 0
  },
  label: {
    marginBottom: 0
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
