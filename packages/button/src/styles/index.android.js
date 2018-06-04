import { StyleSheet } from "react-native";
import { fonts, fontSizes } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  button: {
    ...sharedStyles.button,
    borderRadius: 4,
    elevation: 3,
    height: 36,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1.0,
    shadowRadius: 5
  },
  textStyle: {
    color: "#FFFFFF",
    fontFamily: fonts.supporting,
    fontSize: fontSizes.button,
    paddingTop: 0
  }
});

export default styles;
