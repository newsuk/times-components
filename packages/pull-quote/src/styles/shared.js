import styleguideFactory from "@times-components/styleguide";

const { colours, fonts, fontFactory, spacing } = styleguideFactory();
const sharedStyles = {
  container: {
    marginTop: 0,
    marginBottom: spacing(6)
  },
  quotes: {
    fontFamily: fonts.headlineRegular,
    fontSize: 75,
    marginTop: 0,
    marginBottom: spacing(-8)
  },
  content: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "pageComponentHeadline"
    }),
    color: colours.functional.primary
  },
  caption: {
    ...fontFactory({ font: "supporting", fontSize: "caption" }),
    marginBottom: 0
  },
  link: {
    color: colours.functional.action,
    ...fontFactory({ font: "supporting", fontSize: "link" }),
    textDecorationLine: "none",
    marginLeft: 3
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing(2),
    height: 20
  },
  twitterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: colours.functional.keyline,
    marginLeft: 7,
    paddingLeft: 7,
    height: 15
  }
};

export default sharedStyles;
