import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { colours, fonts, fontSizes, spacing } = styleguide();

export default StyleSheet.create({
  bullet: {
    height: 6,
    top: 2,
    width: 6,
    backgroundColor: "#9F0000"
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%"
  },
  container: {
    paddingHorizontal: "20px",
    paddingVertical: "16px",
    backgroundColor: colours.functional.backgroundPrimary,
    borderTopWidth: "2px",
    borderTopColor: "#9F0000",
  },
  link: {
    color: colours.functional.action
  },
  text: {
    color: colours.functional.primary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.infoSubText,
    marginTop: -8,
    paddingLeft: spacing(3),
    width: "95%"
  },
  title: {
    fontFamily: fonts.headlineRegular,
    fontSize: fontSizes.keyFactsTitle,
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: spacing(4),
    color: colours.functional.brandColour,
  },
  wrapper: {
    flex: 1
  }
});
