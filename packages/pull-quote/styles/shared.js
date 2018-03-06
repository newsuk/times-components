import { colours, fonts } from "@times-components/styleguide";

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
    fontSize: 25,
    lineHeight: 30,
    color: colours.functional.primary
  },
  caption: {
    fontFamily: fonts.supporting,
    fontSize: 13,
    marginBottom: 0,
    lineHeight: 13
  },
  link: {
    color: colours.functional.cta,
    fontFamily: fonts.supporting,
    textDecorationLine: "none",
    fontSize: 13,
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
