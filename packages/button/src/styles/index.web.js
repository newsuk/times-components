import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();

const styles = {
  button: {
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    color: colours.functional.white,
    cursor: "pointer",
    height: 45,
    justifyContent: "center",
    minWidth: 100,
    ...fontFactory({
      font: "supporting",
      fontSize: "button"
    }),
    paddingTop: 4,
    lineHeight: 0,
    width: 160
  }
};

export default styles;
