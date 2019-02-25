import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    margin: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileLeadHeadline"
    }),
    marginBottom: spacing(2)
  }
};

export default styles;
