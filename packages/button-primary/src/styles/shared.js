import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = {
  listErrorButtonContainer: {
    justifyContent: "center",
    width: "100%"
  },
  listErrorButton: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    height: 45,
    justifyContent: "center"
  },
  listErrorButtonText: {
    color: "#FFF",
    fontFamily: fonts.supporting,
    fontSize: fontSizes.buttonPrimary
  }
};

export default styles;
