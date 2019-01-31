import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";

const { fonts, spacing } = styleguideFactory();

const styles = StyleSheet.create({
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
});

export default styles;
