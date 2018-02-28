import { fonts } from "@times-components/styleguide";

const sharedStyles = {
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#1d1d1b",
    marginBottom: 7,
    fontFamily: fonts.headline
  },
  standFirst: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fonts.headlineRegular,
    color: "#333333",
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
