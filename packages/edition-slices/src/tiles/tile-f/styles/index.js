import { fontFactory, spacing } from "@times-components/ts-components";

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
    marginBottom: spacing(2)
  }
};

export default styles;
