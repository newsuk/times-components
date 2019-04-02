import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { fontFactory } = styleguide();
const styles = StyleSheet.create({
  title: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 0.6,
    marginBottom: 0
  }
});

export default styles;
