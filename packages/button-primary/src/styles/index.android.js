import { StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 36,
    justifyContent: "center",
    width: "100%"
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 4,
    elevation: 3,
    height: 36,
    justifyContent: "center",
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
    fontSize: fontSizes.buttonPrimary
  }
});

export default styles;
