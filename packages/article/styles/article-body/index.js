import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";
import globalStyle from "../shared";

const nativeStyles = {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginBottom: 4 * spacing
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...nativeStyles
});

export default styles;
