import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const androidStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontSize: 28,
    lineHeight: 37,
    fontWeight: "400"
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 29,
    paddingBottom: 15,
    marginTop: -7
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
