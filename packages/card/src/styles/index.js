import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  reversedCardContainer: {
    height: "auto"
  },
  imageContainer: {
    flex: 1,
    marginBottom: spacing(2),
    minWidth: "100%"
  },
  reversedImageContainer: {
    marginBottom: 0
  },
  contentContainer: {
    flex: 1,
    marginBottom: 0,
    minWidth: "100%"
  },
  reversedContentContainer: {
    marginBottom: spacing(2)
  },
  headerContainer: {
    height: 24,
    marginBottom: spacing(2),
    maxWidth: 300
  },
  textContainer: {
    height: 10,
    marginBottom: spacing(2)
  },
  lastBar: {
    marginBottom: 0,
    maxWidth: 240
  }
});

export default styles;
