import { fontFactory, spacing } from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  headline: {
    marginBottom: 0,
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    })
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    paddingTop: spacing(2),
    lineHeight: 1.43,
    width: "100%",
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "teaser"
    }),
    ...fullHeightSummaryContainer
  }
};

export default styles;
