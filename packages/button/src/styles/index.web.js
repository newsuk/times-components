import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();

const styles = {
  button: {
    ...fontFactory({
      font: "supporting",
      fontSize: "button"
    }),
    alignItems: "center",
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    color: colours.functional.white,
    cursor: "pointer",
    height: 45,
    justifyContent: "center",
    lineHeight: 0,
    minWidth: 100,
    paddingTop: 4,
    width: 160
  }
};

export default styles;
