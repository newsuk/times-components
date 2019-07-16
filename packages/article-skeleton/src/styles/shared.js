import { spacing, colours } from "@times-components/styleguide";
import { maxWidth } from "../gutter";

const globalStyle = {
  articleContainer: {
    backgroundColor: colours.functional.gutter
  },
  articleMainContentRow: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  gutter: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    maxWidth: "100%",
    width: maxWidth
  },
  inlineParagraphContainer: {
    marginBottom: spacing(-2)
  }
};

export default globalStyle;
