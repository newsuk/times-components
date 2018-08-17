import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const sharedStyles = {
  articleMeta: {
    marginBottom: spacing(4),
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: spacing(2),
    marginRight: spacing(2)
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  articleMetaElement: {
    borderTopColor: colours.functional.keyline,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  datePublication: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    })
  },
  byline: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary
  }
};

export default sharedStyles;
