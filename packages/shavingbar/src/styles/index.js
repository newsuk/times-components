import { colours, fonts, spacing } from "@times-components/styleguide";

export default {
  bar: {
    display: "flex",
    flexDirection: "row",
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing(1),
    paddingBottom: spacing(1)
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  groupElements: {
    display: "flex",
    flexDirection: "row"
  },
  text: {
    color: colours.functional.primary,
    fontFamiliy: fonts.supporting,
    marginLeft: 0,
    margin: spacing(1),
    marginRight: spacing(2)
  },
  bubble: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: colours.functional.keyline,
    borderWidth: 1,
    borderRadius: spacing(4),
    padding: spacing(2),
    height: spacing(8),
    width: spacing(8)
  }
};
