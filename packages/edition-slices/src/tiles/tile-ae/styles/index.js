import { fonts, spacing } from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    ...fullHeightSummaryContainer
  }
};

export default styles;
