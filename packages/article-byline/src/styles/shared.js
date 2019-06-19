import styleguide from "@times-components/styleguide";

const { colours, fontFactory } = styleguide();
const shared = {
  link: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.action,
    textDecorationLine: "none"
  },
  nonLinkText: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.primary,
    flexDirection: "row"
  },
  opinion: {
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    }),
    color: colours.section.comment,
    fontWeight: "400"
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
