import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";
import globalStyle from "../shared";

const nativeStyles = scale => ({
  ...sharedStyles(scale),
  articleTextElement: {
    ...sharedStyles(scale).articleTextElement,
    marginBottom: spacing(4)
  }
});

const styles = (scale) => StyleSheet.create({
  ...globalStyle,
  ...nativeStyles(scale)
});

export default styles;
