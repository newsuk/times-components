import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const sharedStyles = {
  articleMeta: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    marginBottom: spacing(4),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingBottom: spacing(2),
    paddingLeft: 0,
    paddingRight: 0
  },
  articleMetaElement: {
    // TODO: put back after design signoff
    // paddingTop: spacing(1)
    paddingTop: spacing(2)
  },
  articleMetaElementWithBorder: {
    paddingTop: spacing(2),
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1
  },
  articleMetaTablet: {
    marginLeft: 0,
    marginRight: 0
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
