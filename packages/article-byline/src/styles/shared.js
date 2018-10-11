import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();
const shared = {
  link: {
    color: colours.functional.action,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    })
  },
  text: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    flexDirection: "row"
  }
};

export default shared;
