import { StyleSheet } from "react-native";
import sharedStylesFactory from "./shared";
import globalStyle from "../shared";

const sharedStyles = sharedStylesFactory();

const webStyles = {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...webStyles
});

export default styles;
