import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";

export default scale => {
  const sharedStyles = sharedStylesFactory(scale);
  return StyleSheet.create({
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      marginBottom: spacing(4)
    }
  });
};
