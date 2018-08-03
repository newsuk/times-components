import { StyleSheet } from "react-native";
import timesStyleguide from "@times-components/styleguide";
import sharedStyles from "./shared";
import globalStyle from "../shared";

const androidStyles = scale => {
  const { spacing } = timesStyleguide({ scale });

  return {
    ...sharedStyles(scale),
    leadAsset: {
      marginBottom: 6
    },
    articleTextElement: {
      ...sharedStyles(scale).articleTextElement,
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
