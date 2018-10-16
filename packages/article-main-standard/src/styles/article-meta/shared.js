import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const sharedStyles = {
  articleMeta: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    marginBottom: spacing(4),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingLeft: 0,
    paddingRight: 0
  },
  articleMetaElement: {
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  byline: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary
  },
  datePublication: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    })
  }
};

export default sharedStyles;
