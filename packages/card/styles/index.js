import { StyleSheet } from "react-native";

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
    marginBottom: 10,
    minWidth: "100%"
  },
  reversedImageContainer: {
    marginBottom: 0
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10,
    minWidth: "100%"
  },
  reversedContentContainer: {
    marginBottom: 10
  },
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 300
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  },
  lastBar: {
    marginBottom: 0,
    maxWidth: 240
  }
});

export default styles;
