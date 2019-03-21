import { StyleSheet } from "react-native";
import { colours, fonts, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  listItemContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  puzzleNotificationBarArrow: {
    paddingLeft: spacing(2),
    paddingTop: spacing(1)
  },
  puzzleNotificationBarContainer: {
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacing(4)
  },
  puzzleNotificationBarText: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headlineRegular,
    fontSize: 20
  }
});

export default styles;
