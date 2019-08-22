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
    // TODO: put back after design signoff
    // fontWeight: "bold"
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
  centered: {
    textAlign: "center"
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
