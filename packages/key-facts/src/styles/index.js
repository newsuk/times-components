import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { colours, fontFactory, fonts, fontSizes, spacing } = styleguide();

export default StyleSheet.create({
  bullet: {
    borderRadius: 2.5,
    height: 5,
    top: 2,
    width: 5
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%"
  },
  container: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  },
  containerTablet: {
    alignSelf: "center",
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: spacing(2),
    width: "80.8%"
  },
  link: {
    color: colours.functional.action
  },
  text: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "body",
      fontSize: "secondary"
    }),
    marginTop: -8,
    paddingLeft: spacing(3),
    width: "95%"
  },
  title: {
    fontFamily: fonts.supporting,
    fontSize: fontSizes.keyFactsTitle,
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: spacing(4)
  },
  titleTablet: {
    paddingRight: spacing(4),
    width: "20%"
  },
  wrapper: {
    flex: 1
  }
});
