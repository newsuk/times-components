import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: "100%",
    opacity: 1
  },
  imageBackground: {
    height: "100%",
    width: "100%"
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: "center"
  },
  modal: {
    backgroundColor: colours.functional.brandColour,
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
