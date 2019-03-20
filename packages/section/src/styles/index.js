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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: spacing(1)
  },
  puzzleNotificationBarContainer: {
    flexDirection: "row",
    paddingLeft: spacing(5),
    paddingRight: spacing(2),
    paddingVertical: spacing(2)
  },
  puzzleNotificationBarText: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: 18
  }
});

export default styles;
