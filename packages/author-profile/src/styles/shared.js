import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: 1,
    minHeight: 264,
    width: "100%"
  },
  loadingGradient: {
    flex: 1
  },
  loadingRoundImage: {
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    position: "absolute",
    top: spacing(6),
    width: 100
  },
  authorHeadWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  authorHeadContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: spacing(8),
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: 1
  },
  authorHeadContainerNative: {
    paddingTop: spacing(6),
    paddingBottom: spacing(4)
  },
  authorPhoto: {
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    marginBottom: spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    width: 100
  },
  name: {
    color: colours.functional.brandColour,
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    })
  },
  jobTitle: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegularSmallCaps",
      fontSize: "meta"
    }),
    marginTop: spacing(1)
  },
  biographyContainer: {
    paddingBottom: spacing(6),
    paddingHorizontal: spacing(2),
    width: "100%"
  },
  biography: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "body",
      fontSize: "secondary"
    }),
    textAlign: "center"
  },
  twitter: {
    flexDirection: "row",
    paddingVertical: spacing(2)
  },
  twitterLink: {
    color: colours.functional.action,
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
    paddingLeft: spacing(1),
    textDecorationLine: "none"
  }
};

export default styles;
