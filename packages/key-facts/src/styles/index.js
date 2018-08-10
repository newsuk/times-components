import { StyleSheet } from "react-native";
import styleguide, {
  colours,
  fonts,
  spacing
} from "@times-components/styleguide";

const styles = scale =>
  StyleSheet.create({
    container: {
      marginBottom: spacing(1),
      marginLeft: spacing(2),
      marginRight: spacing(2),
      marginTop: spacing(1)
    },
    bullet: {
      backgroundColor: colours.functional.bullet,
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
      ...styleguide({ scale }).fontFactory({
        font: "body",
        fontSize: "secondary"
      }),
      marginTop: -8,
      paddingLeft: spacing(3),
      width: "95%"
    },
    title: {
      fontFamily: fonts.supporting,
      fontSize: styleguide({ scale }).fontSizes.cardMetaMobile,
      fontWeight: "400",
      letterSpacing: 1.2,
      marginBottom: spacing(4)
    }
  });

export default styles;
