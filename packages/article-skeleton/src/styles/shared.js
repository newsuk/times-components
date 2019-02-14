import { spacing, tabletWidth } from "@times-components/styleguide";
import { maxWidth } from "../gutter";

const globalStyle = {
  articleContainer: {
    backgroundColor: "#f0f0f0"
  },
  articleMainContentRow: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  gutter: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    width: maxWidth
  },
  relatedArticlesTablet: {
    alignSelf: "center",
    maxWidth: tabletWidth,
    width: "100%"
  }
};

export default globalStyle;
