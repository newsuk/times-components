import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStylesFactory from "./shared";
import globalStyle from "../shared";

const androidStyles = scale => {
  const { spacing } = styleguide({ scale });
  const sharedStyles = sharedStylesFactory(scale);

  return {
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      fontStyle: "normal",
      marginBottom: spacing(4)
    },
    leadAsset: {
      marginBottom: 6
    }
  };
};

const styles = scale =>
  StyleSheet.create({
    ...globalStyle,
    ...androidStyles(scale)
  });

export default styles;
