import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();
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
