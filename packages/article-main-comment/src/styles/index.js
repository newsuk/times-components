import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  authorImage: {
    ...sharedStyles.authorImage,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100
  },
  flag: {
    ...sharedStyles.flag,
    paddingTop: spacing(1)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
