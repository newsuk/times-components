import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const styles = {
  authorHeadContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: 1,
    flexDirection: "column",
    paddingBottom: spacing(8),
    width: "100%"
  },
  authorHeadWrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%"
  },
  authorPhoto: {
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    width: 100
  },
  biography: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "body",
      fontSize: "secondary"
    }),
    textAlign: "center"
  },
  biographyContainer: {
    paddingBottom: spacing(6),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    width: "100%"
  },
  jobTitle: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegularSmallCaps",
      fontSize: "meta"
    })
  },
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
  name: {
    color: colours.functional.brandColour,
    ...fontFactory({
      font: "headline",
      fontSize: "headline"
    })
  },
  twitter: {
    flexDirection: "row",
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  },
  twitterLink: {
    color: colours.functional.action,
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiaryTwitter"
    }),
    paddingLeft: spacing(1),
    textDecorationLine: "none"
  }
};

export default styles;
