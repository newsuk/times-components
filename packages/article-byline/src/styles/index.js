import { StyleSheet } from "react-native";
import styleguide, { colours } from "@times-components/styleguide";

const { fontFactory } = styleguide();
const styles = StyleSheet.create({
  text: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    flexDirection: "row"
  },
  link: {
    color: colours.functional.action
  }
});

export default styles;
