import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileLeadHeadline"
    })
  },
  summaryContainer: {
    marginBottom: spacing(3)
  }
};

export default styles;
