import { StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

export default StyleSheet.create({
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.pageComponentHeadline,
    color: colours.functional.primary
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: 5,
    fontFamily: fonts.headline,
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 22
  }
});
