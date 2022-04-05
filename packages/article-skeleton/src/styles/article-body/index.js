import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";
import globalStyle from "../shared";

const sharedStyles = sharedStylesFactory();

const webStyles = {
  ...sharedStyles,
  ad: {
    ...sharedStyles.ad,
    marginBottom: spacing(6),
    marginTop: spacing(6),
    width: "100%"
  },
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  },
  adMarginStyle: {
    marginBottom: 0
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...webStyles
});

export default styles;
