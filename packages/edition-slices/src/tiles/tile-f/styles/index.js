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
    marginHorizontal: spacing(8),
    marginVertical: spacing(1)
  }
};

export default styles;
