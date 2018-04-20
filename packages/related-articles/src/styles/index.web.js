import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  titleContainer: {
    ...sharedStyles.titleContainer
  },
  title: {
    ...sharedStyles.title
  },
  headline: {
    ...sharedStyles.headline,
    lineHeight: 24,
    marginTop: 0
  },
  byline: {
    ...sharedStyles.byline
  },
  opinionByline: {
    ...sharedStyles.opinionByline,
    lineHeight: 24,
    marginTop: 0
  }
});

export default styles;
