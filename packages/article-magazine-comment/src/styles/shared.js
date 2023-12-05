import {
  tabletRowPadding,
  colours,
  fontFactory,
  spacing,
  tabletWidth
} from "@times-components/ts-styleguide";

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
    marginBottom: spacing(5),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingTop: spacing(7)
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
    alignSelf: "center",
    width: tabletWidth - tabletRowPadding
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
    marginLeft: spacing(2),
    marginRight: spacing(2)
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    color: colours.functional.primary,
    marginBottom: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    textAlign: "center"
  }
};

export default sharedStyles;
