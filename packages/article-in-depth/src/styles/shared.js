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
  container: {
    alignItems: "center",
    paddingBottom: spacing(9),
    paddingHorizontal: spacing(4),
    paddingTop: spacing(12)
  },
  datePublication: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    marginTop: spacing(1)
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
  leadAssetContainer: {
    marginBottom: spacing(4)
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  metaContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(5),
    marginHorizontal: spacing(2),
    paddingBottom: 6,
    paddingTop: spacing(2)
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
