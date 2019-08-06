import styleguide, { tabletWidth } from "@times-components/styleguide";

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
  articleHeadlineTablet: {
    ...fontFactory({
      font: "headline",
      fontSize: "articleHeadline"
    })
  },
  authorImage: {
    marginBottom: spacing(5)
  },
  container: {
    alignItems: "center",
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  containerTablet: {
    alignSelf: "center",
    width: tabletWidth
  },
  datePublication: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    marginTop: spacing(1)
  },
  datePublicationTablet: {
    marginTop: "auto"
  },
  flags: {
    marginBottom: spacing(3),
    marginTop: spacing(1)
  },
  header: {
    // TODO: put back after design signoff
    marginBottom: spacing(3),
    paddingBottom: spacing(4),
    paddingTop: spacing(7)
  },
  headerTablet: {
    alignSelf: "center",
    width: tabletWidth
  },
  label: {
    marginBottom: spacing(2)
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  metaContainer: {
    alignItems: "center",
    width: "100%",
    paddingVertical: spacing(2),
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1
  },
  metaContainerTablet: {
    flexDirection: "row",
    justifyContent: "center"
  },
  separator: {
    borderRightColor: colours.functional.keyline,
    borderRightWidth: 1,
    height: spacing(3),
    marginHorizontal: spacing(2)
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
