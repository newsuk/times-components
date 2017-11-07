import { StyleSheet } from "react-native";

const styles = {
  container: {
    flexDirection: "column"
  },
  childrenContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  imageContainer: {
    marginBottom: 10
  }
};

export default {
  horizontal: StyleSheet.create({
    ...styles,
    container: {
      ...styles.container,
      flexDirection: "row"
    },
    imageContainer: {
      ...styles.imageContainer,
      flexGrow: 2,
      flexBasis: 0,
      marginRight: 10,
      marginBottom: 0
    },
    summaryContainer: {
      flexGrow: 3,
      flexBasis: 0
    }
  }),
  vertical: StyleSheet.create(styles)
};
