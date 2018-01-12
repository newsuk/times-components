import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const iosStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    marginBottom: 0
  },
  // iOS Font hack
  caption: {
    ...sharedStyles.caption,
    paddingTop: 4
  },
  link: {
    ...sharedStyles.link,
    paddingTop: 4
  }
});

export default iosStyles;
