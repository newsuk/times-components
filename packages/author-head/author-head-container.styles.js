import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

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
    backgroundColor: colours.functional.backgroundPrimary
  }
});

export default styles;
