import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";

const { fonts, spacing } = styleguideFactory();

const styles = StyleSheet.create({
  headline: {
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
});

export default styles;
