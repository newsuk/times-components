import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const sharedStyles = {
  articleFlag: {
    flexDirection: "row",
    marginBottom: spacing(3),
    marginTop: spacing(1)
  },
  articleFlagContainer: {
    marginRight: spacing(3)
  },
  articleHeadLineText: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    }),
    color: colours.functional.brandColour,
    marginBottom: spacing(2),
    textAlign: "center",
  },
  articleLabel: {
    paddingBottom: spacing(1),
    paddingTop: spacing(1)
  },
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colours.functional.keyline,
    paddingTop: spacing(7),
    paddingBottom: spacing(5),
    marginBottom: spacing(4),
  },
  datePublication :{
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing(3)
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    color: colours.functional.primary,
    textAlign: "center"
  }
};

export default sharedStyles;
