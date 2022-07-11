import { colours, fontFactory } from "@times-components/ts-styleguide";

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
  text: {
    color: colours.functional.white,
    ...fontFactory({
      font: "supporting",
      fontSize: "button"
    }),
    paddingTop: 5
  }
};

export default styles;
