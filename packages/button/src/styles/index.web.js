import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();

const styles = {
  button: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderColor: colours.functional.action,
    borderRadius: 2,
    color: colours.functional.white,
    cursor: "pointer",
    ...fontFactory({
      font: "supporting",
      fontSize: "button"
    }),
    height: 45,
    justifyContent: "center",
    lineHeight: 0,
    minWidth: 100,
    paddingTop: 4,
    width: 160
  }
};

export default styles;
