import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const sharedStyles = {
  articleHeadline: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    }),
    color: colours.functional.brandColour,
    marginBottom: spacing(2),
    textAlign: "center"
  },
  authorImage: {
    marginBottom: spacing(5)
  },
  container: {
    alignItems: "center",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    marginBottom: spacing(4),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingBottom: spacing(5),
    paddingTop: spacing(7)
  },
  datePublication: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    marginTop: spacing(3)
  },
  flag: {
    flexDirection: "row",
    marginBottom: spacing(3),
    marginTop: spacing(1)
  },
  flagContainer: {
    marginRight: spacing(3)
  },
  label: {
    marginBottom: spacing(2)
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    color: colours.functional.primary,
    marginBottom: spacing(3),
    paddingHorizontal: spacing(2),
    textAlign: "center"
  }
};

export default sharedStyles;
