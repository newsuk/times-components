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
  container: {
    alignItems: "center",
    marginBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
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
  datePublicationTablet: {
    marginTop: "auto"
  },
  label: {
    marginBottom: spacing(2)
  },
  leadAssetContainer: {
    marginBottom: spacing(4)
  },
  leadAssetContainerTablet: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  metaContainer: {
    alignItems: "center"
  },
  metaContainerTablet: {
    flexDirection: "row",
    justifyContent: "center"
  },
  metaTablet: {
    paddingTop: spacing(1)
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
  },
  tabletContainer: {
    alignSelf: "center",
    width: tabletWidth
  }
};

export default sharedStyles;
