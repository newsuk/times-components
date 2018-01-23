import { Colors } from "@times-components/styleguide";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 40,
    backgroundColor: Colours.backgroundGrey
  }
});

export default styles;
