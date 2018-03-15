import { colours, fonts, fontSizes } from "@times-components/styleguide";

const sharedStyles = {
  container: {
    marginTop: 0,
    marginBottom: 30
  },
  quotes: {
    fontFamily: fonts.headlineRegular,
    fontSize: 75,
    marginTop: 0,
    marginBottom: -40
  },
  content: {
    fontFamily: fonts.headlineRegular,
    fontSize: fontSizes.pageComponentHeadline,
    lineHeight: 30,
    color: colours.functional.primary
  },
  caption: {
    fontFamily: fonts.supporting,
    fontSize: fontSizes.caption,
    marginBottom: 0,
    lineHeight: 13
  },
  link: {
    color: colours.functional.action,
    fontFamily: fonts.supporting,
    textDecorationLine: "none",
    fontSize: fontSizes.link,
    marginLeft: 3,
    lineHeight: 13
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    height: 20
  },
  twitterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: colours.functional.secondary,
    marginLeft: 7,
    paddingLeft: 7,
    height: 15
  }
};

export default sharedStyles;
