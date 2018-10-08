import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStylesFactory from "./shared";

export default scale => {
  const { spacing } = styleguide({ scale });
  const sharedStyles = sharedStylesFactory(scale);

  return StyleSheet.create({
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      fontStyle: "normal",
      marginBottom: spacing(4)
    }
  });
};
