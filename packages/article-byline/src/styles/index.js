import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();
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
