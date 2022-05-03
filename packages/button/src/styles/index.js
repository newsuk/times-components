import styleguide from "@times-components/styleguide";
// import { styleguide } from "@times-components/ts-components";
// import { styleguide } from "../../../ts-components";

console.log('ADAM: bob: ', styleguide);

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
