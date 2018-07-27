import { StyleSheet } from "react-native";
import Styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";
import globalStyle from "../shared";

const androidStyles = scale => {
  const { fontSizes, spacing } = Styleguide({ scale });

  return {
    ...sharedStyles,
    leadAsset: {
      marginBottom: 6
    },
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      fontSize: fontSizes.bodyMobile,
      fontStyle: "normal",
      marginBottom: spacing(4)
    }
  };
};

const styles = scale =>
  StyleSheet.create({
    ...globalStyle,
    ...androidStyles(scale)
  });

export default styles;
