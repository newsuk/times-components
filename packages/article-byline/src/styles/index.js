import { StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.cardMeta,
    fontFamily: fonts.supporting,
    color: colours.functional.secondary,
    lineHeight: 13,
    flexDirection: "row"
  },
  link: {
    color: colours.functional.action
  }
});

export default styles;
