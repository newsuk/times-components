import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageContainer: {
    flex: 1,
    minWidth: "100%"
  },
  layout: {
    marginBottom: 10
  },
  contentContainer: {
    flex: 1,
    minWidth: "100%"
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
