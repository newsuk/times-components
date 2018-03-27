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
    minWidth: "100%"
  },
  reversedImageContainer: {
    marginBottom: -10,
    marginTop: 120,
    minWidth: "auto",
    paddingLeft: 10,
    paddingRight: 10
  },
  contentContainer: {
    flex: 1,
    minWidth: "100%"
  },
  reversedContentContainer: {
    maxWidth: "50%",
    minWidth: "auto"
  },
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 300
  },
  layout: {
    marginBottom: 10
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
