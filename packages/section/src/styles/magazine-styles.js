import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.black,
    position: "relative",
    width: "100%"
  },
  image: {
    width: "100%"
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.black,
    flex: 1,
    width: "100%"
  },
  label: {
    color: colours.functional.white,
    letterSpacing: 0.3,
    paddingHorizontal: 13,
    paddingVertical: 8
  },
  labelWrapper: {
    backgroundColor: colours.functional.transparentBlack,
    borderRadius: 9999,
    bottom: 20,
    position: "absolute"
  }
});

export default styles;
