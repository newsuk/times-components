import { fonts, spacing } from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const styles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35,
    paddingBottom: spacing(1)
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    ...fullHeightSummaryContainer
  }
};

export default styles;
