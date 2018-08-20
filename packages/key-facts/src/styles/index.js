import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { colours, fontFactory, fonts, fontSizes, spacing } = styleguide();

export default StyleSheet.create({
  container: {
    marginBottom: spacing(1),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    marginTop: spacing(1)
  },
  bullet: {
    height: 8,
    top: 2,
    transform: [{ rotate: "45deg" }],
    width: 8
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%"
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
    fontSize: fontSizes.cardMetaMobile,
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: spacing(4)
  }
});
