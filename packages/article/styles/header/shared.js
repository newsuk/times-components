import { Colours } from "@times-components/styleguide";

const sharedStyles = {
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: Colours.timesBlack,
    marginBottom: 7,
    fontFamily: "TimesModern-Bold"
  },
  standFirst: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "TimesModern-Regular",
    color: Colours.darkGrey,
    paddingBottom: 9
  },
  articleLabel: {
    paddingTop: 4,
    paddingBottom: 5
  },
  articleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: 14
  }
};

export default sharedStyles;
