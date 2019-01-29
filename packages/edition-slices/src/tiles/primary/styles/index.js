import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";

const { fontFactory, spacing } = styleguideFactory();

const styles = StyleSheet.create({
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "sliceHeadline"
    }),
    lineHeight: 32
  },
  imageContainer: {
    backgroundColor: "blue",
    marginBottom: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
});

export default styles;
