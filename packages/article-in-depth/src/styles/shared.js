import {
  colours,
  fontFactory,
  spacing,
  tabletWidth,
  tabletWidthMax
} from "@times-components/ts-styleguide";

const sharedStyles = {
  articleHeadline: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    }),
    fontWeight: 400,
    color: colours.functional.brandColour,
    marginBottom: spacing(2),
    textAlign: "center"
  },
  container: {
    alignItems: "center",
    paddingBottom: spacing(9),
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    paddingTop: spacing(12)
  },
  containerTablet: {
    alignSelf: "center",
    maxWidth: tabletWidthMax
  },
  datePublication: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary,
    marginTop: spacing(1)
  },
  datePulicationTablet: {
    marginTop: spacing(0)
  },
  headerText: {
    alignItems: "center"
  },
  headerTextTablet: {
    width: tabletWidth
  },
  label: {
    marginBottom: spacing(2)
  },
  leadAsset: {
    marginBottom: spacing(0)
  },
  leadAssetTablet: {
    alignSelf: "center",
    maxWidth: tabletWidthMax,
    width: "100%"
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  metaContainer: {
    alignItems: "center",
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(4)
  },
  metaContainerTablet: {
    alignSelf: "center",
    width: tabletWidth
  },
  metaContainerTabletFlow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
  separator: {
    borderRightColor: colours.functional.keyline,
    borderRightWidth: 1,
    height: spacing(3),
    marginRight: spacing(2),
    paddingLeft: spacing(2)
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline"
    }),
    fontWeight: 400,
    color: colours.functional.primary,
    marginBottom: spacing(3),
    textAlign: "center"
  }
};

export default sharedStyles;
