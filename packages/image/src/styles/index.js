import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageBackground: { height: "100%", width: "100%" },
  placeholder: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 0
  },
  wrapper: {
    display: "table",
    height: 0,
    overflow: "hidden"
  }
});

export default styles;
