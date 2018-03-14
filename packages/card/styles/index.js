import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
    minWidth: "100%"
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
