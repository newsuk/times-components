import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = {
  button: {
    justifyContent: "center"
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    height: 45,
    justifyContent: "center",
    minWidth: 100,
    width: 160
  },
  textStyle: {
    color: "#FFF",
    fontFamily: fonts.supporting,
    fontSize: fontSizes.buttonPrimary
  }
};

export default styles;
