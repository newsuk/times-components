import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

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
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    color: colours.functional.greyDark
  },
  headline: {
    color: colours.functional.greyDark,
    marginBottom: 5,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  },
  imageContainer: {
    marginBottom: 10
  }
});
