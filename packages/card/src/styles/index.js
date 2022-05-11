import { StyleSheet } from "react-native";
import { spacing } from "@times-components/ts-styleguide";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  cardContainerTablet: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  contentContainer: {
    flex: 1,
    marginBottom: 0,
    minWidth: "100%"
  },
  contentContainerTablet: {
    flex: 1,
    marginBottom: 0
  },
  headerContainer: {
    height: 24,
    marginBottom: spacing(2),
    maxWidth: 300
  },
  imageContainer: {
    flex: 1,
    marginBottom: spacing(2),
    minWidth: "100%"
  },
  imageContainerTablet: {
    flex: 1,
    marginRight: spacing(4),
    maxWidth: 320
  },
  lastBar: {
    marginBottom: 0,
    maxWidth: 240
  },
  loadingContentContainer: {
    minHeight: 84
  },
  reversedCardContainer: {
    height: "auto"
  },
  reversedContentContainer: {
    marginBottom: spacing(2)
  },
  reversedImageContainer: {
    marginBottom: 0
  },
  textContainer: {
    height: 10,
    marginBottom: spacing(2)
  }
});

export default styles;
