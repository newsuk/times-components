import { fonts, spacing } from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const styles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  summaryContainer: {
    ...fullHeightSummaryContainer
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  }
};

export default styles;
