import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();
const shared = {
  text: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    flexDirection: "row"
  },
  link: {
    color: colours.functional.action,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    })
  }
};

export default shared;
