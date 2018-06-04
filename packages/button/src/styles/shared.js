import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = {
  button: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    height: 45,
    justifyContent: "center",
    minWidth: 100,
    width: "100%"
  },
  textStyle: {
    color: "#FFF",
    fontFamily: fonts.supporting,
    fontSize: fontSizes.button,
    paddingTop: 5
  }
};

export default styles;
