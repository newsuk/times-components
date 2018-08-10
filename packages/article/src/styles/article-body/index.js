import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";
import globalStyle from "../shared";

const nativeStyles = scale => {
  const sharedStyles = sharedStylesFactory(scale);
  return {
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      marginBottom: spacing(4)
    }
  };
};

const styles = scale =>
  StyleSheet.create({
    ...globalStyle,
    ...nativeStyles(scale)
  });

export default styles;
